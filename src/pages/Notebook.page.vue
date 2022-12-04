<template>
  <q-page padding>
    <q-card bordered flat>
      <q-card-section>
        <NotebookPageCardTitle
          :title="'Caderno de contas'"
          :description="'Caderno de contas de casa'"
          :id="1"
        />
      </q-card-section>
      <q-separator class="q-mt-md" inset />
      <q-card-section>
        <CarouselYear />
      </q-card-section>
      <q-separator
        class="centered"
        size="2px"
        width="35%"
        style="margin: 0 auto"
      />
      <q-card-section>
        <CarouselMonth />
      </q-card-section>
      <q-separator
        class="centered"
        size="2px"
        width="35%"
        style="margin: 0 auto"
      />
      <q-card-section padding class="q-mt-lg">
        <q-table
          :rows="bills"
          :columns="columns"
          row-key="id"
          :rows-per-page-options="[0]"
          flat
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width />
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label }}
              </q-th>
              <q-th align="right">Actions</q-th>
            </q-tr>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-btn
                  v-if="props.row.tag_id"
                  size="sm"
                  color="warning"
                  round
                  dense
                  @click="props.row.expand = !props.row.expand"
                  :icon="props.row.expand ? 'remove' : 'add'"
                />
              </q-td>
              <q-td>
                <q-badge rounded v-if="!props.row.isPaid" :color="'grey'" />
                <span v-else class="text-primary">PG</span>
              </q-td>
              <q-td>
                <q-icon
                  name="local_offer"
                  v-if="props.row.tag_id"
                  :style="'color:' + props.row.color + '!important;'"
                  class="q-mr-sm"
                />
                <span>{{ props.row.name }}</span>
              </q-td>
              <q-td>
                {{ $d(props.row.due_date) }}
              </q-td>
              <q-td>
                {{ $n(parseFloat(props.row.price), 'currency') }}
              </q-td>
              <q-td align="right">
                <div v-if="!props.row.tag_id">
                  <q-btn
                    flat
                    round
                    icon="money_off_csred"
                    :color="props.row.is_paid ? 'success' : 'grey'"
                    size="sm"
                  ></q-btn>
                  <q-btn flat round icon="edit" color="info" size="sm"></q-btn>
                  <q-btn
                    flat
                    round
                    icon="delete"
                    color="negative"
                    size="sm"
                  ></q-btn>
                </div>
              </q-td>
            </q-tr>
            <q-tr v-show="props.row.expand" :props="props">
              <q-td colspan="100%" class="bg-grey-4">
                <div class="text-left q-py-md q-px-md">
                  <q-table
                    :rows="props.row.bills"
                    :columns="columns"
                    row-key="id"
                    :rows-per-page-options="[0]"
                    flat
                    padding
                    card-class="bg-grey-1 text-warning"
                  >
                    <template v-slot:body-cell-isPaid="props">
                      <q-td :props="props">
                        <q-badge
                          rounded
                          v-if="!props.row.isPaid"
                          :color="'grey'"
                        />
                        <span v-else class="text-primary">PG</span>
                      </q-td>
                    </template>
                  </q-table>
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from 'vue';
import CarouselYear from 'src/components/CarouselYear.vue';
import CarouselMonth from 'src/components/CarouselMonth.vue';
import NotebookPageCardTitle from 'src/components/NotebookPageCardTitle.vue';
import { storeToRefs } from 'pinia';
import { useMonth } from 'src/stores/month.store';
import { useYear } from 'src/stores/year.store';
import useBillService from 'src/services/Bill.service';
import { useRoute } from 'vue-router';
import { QTableProps } from 'quasar';
import lodash from 'lodash';

const columns: QTableProps['columns'] = [
  {
    name: 'isPaid',
    required: false,
    label: 'Status',
    align: 'left',
    sortable: true,
    field: (row: any) => row.is_paid,
  },
  {
    name: 'name',
    required: true,
    label: 'Descrição',
    sortable: true,
    align: 'left',
    sortOrder: 'ad',
    field: (row: any) => row.name,
  },
  {
    name: 'dueDate',
    required: true,
    label: 'Vencimento',
    sortable: true,
    align: 'left',
    field: (row: any) => row.due_date,
  },
  {
    name: 'price',
    required: true,
    label: 'Preço',
    sortable: true,
    align: 'left',
    field: (row: any) => row.price,
  },
];

export default defineComponent({
  name: 'NotebookPage',
  components: {
    CarouselYear,
    CarouselMonth,
    NotebookPageCardTitle,
  },
  setup() {
    const slide = ref('style');
    const { month } = storeToRefs(useMonth());
    const { year } = storeToRefs(useYear());
    const route = useRoute();
    const billService = useBillService();
    const bills: Ref<object[]> = ref([]);

    watch([month, year], async ([newMonthValue, newYearValue]) => {
      const month = newMonthValue.monthInNumber;
      const notebookId: string =
        typeof route.params.id === 'object'
          ? route.params.id[0]
          : route.params.id;
      const response = await billService.findByNotebookIdAndYearAndMonth(
        parseInt(notebookId),
        newYearValue,
        month
      );
      bills.value = response.filter((bill) => {
        return bill.tag_id === null;
      });
      const taggableBills = getTaggableBills(response);
      const groupedBills = getGroupedBillsByTag(taggableBills);
      for (let tagId in groupedBills) {
        bills.value.push(inverseTaggableBills(groupedBills[tagId]));
      }
      bills.value = lodash.orderBy(bills.value, ['name'], ['asc']);
    });

    const getTaggableBills = (bills: object[]) => {
      return bills.filter((bill: any) => {
        return bill.tag_id !== null;
      });
    };

    const getGroupedBillsByTag = (bills: object[]) => {
      return lodash.groupBy(bills, (bill) => bill.tag.id);
    };

    const inverseTaggableBills = (bills: any[]) => {
      const isPaidBills = bills.every((bill: any) => {
        return bill.is_paid === true;
      });
      const lessDueDate = lodash.orderBy(bills, ['due_date'], ['asc']);
      const totalPriceBills = lodash.sumBy(bills, (bill: any) => {
        return parseFloat(bill.price);
      });

      return {
        is_paid: isPaidBills,
        name: bills[0].tag.name,
        due_date: lessDueDate[0].due_date,
        price: totalPriceBills.toFixed(2),
        tag_id: bills[0].tag.id,
        color: bills[0].tag.color,
        bills: bills,
      };
    };

    return {
      slide,
      bills,
      columns,
    };
  },
});
</script>
