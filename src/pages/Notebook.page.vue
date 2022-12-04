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
        <TableBills :bills="bills" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref, watch } from 'vue';
import CarouselYear from 'src/components/CarouselYear.vue';
import CarouselMonth from 'src/components/CarouselMonth.vue';
import NotebookPageCardTitle from 'src/components/NotebookPageCardTitle.vue';
import { storeToRefs } from 'pinia';
import { useMonth } from 'src/stores/month.store';
import { useYear } from 'src/stores/year.store';
import useBillService from 'src/services/Bill.service';
import { useRoute } from 'vue-router';
import lodash from 'lodash';
import TableBills from 'src/components/TableBills.vue';
import { TaggableBillType } from 'src/types/TaggableBill.type';
import { BillType } from 'src/types/Bill.type';
import { MonthType } from 'src/types/Month.type';

export default defineComponent({
  name: 'NotebookPage',
  components: {
    CarouselYear,
    CarouselMonth,
    NotebookPageCardTitle,
    TableBills,
  },
  setup() {
    const slide = ref('style');
    const { month } = storeToRefs(useMonth());
    const { year } = storeToRefs(useYear());
    const route = useRoute();
    const billService = useBillService();
    const bills: Ref<TaggableBillType[]> = ref([]);

    onMounted(() => {
      setBills(month.value, year.value);
    });

    watch([month, year], async ([newMonthValue, newYearValue]) => {
      setBills(newMonthValue, newYearValue);
    });

    const setBills = async (month: MonthType, year: number) => {
      const { monthInNumber } = month;
      const notebookId: string =
        typeof route.params.id === 'object'
          ? route.params.id[0]
          : route.params.id;
      const response: BillType[] =
        await billService.findByNotebookIdAndYearAndMonth(
          parseInt(notebookId),
          year,
          monthInNumber
        );
      bills.value = response.filter((bill: BillType) => {
        return bill.tag_id === null;
      });
      const taggableBills = getTaggableBills(response);
      const groupedBills = getGroupedBillsByTag(taggableBills);
      for (let tagId in groupedBills) {
        bills.value.push(inverseTaggableBills(groupedBills[tagId]));
      }
      bills.value = lodash.orderBy(bills.value, ['name'], ['asc']);
    };

    const getTaggableBills = (bills: BillType[]) => {
      return bills.filter((bill: BillType) => {
        return bill.tag_id !== null;
      });
    };

    const getGroupedBillsByTag = (bills: BillType[]) => {
      return lodash.groupBy(bills, (bill: BillType) => bill.tag?.id);
    };

    const inverseTaggableBills = (bills: any) => {
      const isPaidBills = bills.every((bill: BillType) => {
        return bill.is_paid === true;
      });
      const lessDueDate = lodash.orderBy(bills, ['due_date'], ['asc']);
      const totalPriceBills = lodash.sumBy(bills, (bill: BillType) => {
        return parseFloat(bill.price);
      });

      return {
        id: bills[0].tag.id,
        is_paid: isPaidBills,
        name: bills[0].tag.name,
        due_date: lessDueDate[0].due_date,
        price: totalPriceBills.toFixed(2),
        tag_id: bills[0].tag.id,
        color: bills[0].tag.color,
        bills: bills,
      } as TaggableBillType;
    };

    return {
      slide,
      bills,
    };
  },
});
</script>
