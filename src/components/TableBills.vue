<template>
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
          {{ $t(col.label) }}
        </q-th>
      </q-tr>
    </template>
    <template v-slot:body="props">
      <TableBillsTr
        :propsRow="props"
        :expanded="false"
        @edit-bill-event="editBillEvent"
      >
        <q-td auto-width>
          <q-btn
            v-if="props.row.tag_id"
            size="sm"
            color="warning"
            round
            dense
            @click="props.row.expand = !props.row.expand"
            :icon="props.row.expand ? 'expand_less' : 'expand_more'"
          />
        </q-td>
      </TableBillsTr>
      <transition
        enter-active-class="animated fadeInLeft slow"
        leave-active-class="animated fadeOutLeftBig slower"
      >
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
                <template v-slot:header="props">
                  <q-tr :props="props">
                    <q-th
                      v-for="col in props.cols"
                      :key="col.name"
                      :props="props"
                    >
                      {{ $t(col.label) }}
                    </q-th>
                  </q-tr>
                </template>
                <template v-slot:body="props">
                  <TableBillsTr
                    :propsRow="props"
                    :expanded="true"
                    @edit-bill-event="editBillEvent"
                  ></TableBillsTr>
                </template>
              </q-table>
            </div>
          </q-td>
        </q-tr>
      </transition>
    </template>
  </q-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { QTableProps } from 'quasar';
import TableBillsTr from 'src/components/TableBillsTr.vue';
const columns: QTableProps['columns'] = [
  {
    name: 'isPaid',
    required: false,
    label: 'page.notebook.table.bills.headers.status',
    align: 'left',
    sortable: true,
    field: (row: any) => row.is_paid,
  },
  {
    name: 'name',
    required: true,
    label: 'page.notebook.table.bills.headers.description',
    sortable: true,
    align: 'left',
    sortOrder: 'ad',
    field: (row: any) => row.name,
  },
  {
    name: 'dueDate',
    required: true,
    label: 'page.notebook.table.bills.headers.dueDate',
    sortable: true,
    align: 'left',
    field: (row: any) => row.due_date,
  },
  {
    name: 'price',
    required: true,
    label: 'page.notebook.table.bills.headers.price',
    sortable: true,
    align: 'left',
    field: (row: any) => row.price,
  },
  {
    name: 'totalPaid',
    required: false,
    label: 'page.notebook.table.bills.headers.totalPaid',
    sortable: true,
    align: 'left',
    field: (row: any) => row.total_paid,
  },
  {
    name: 'action',
    required: false,
    label: 'page.notebook.table.bills.headers.actions',
    sortable: false,
    align: 'right',
    field: '',
  },
];
export default defineComponent({
  name: 'TableBill',
  components: {
    TableBillsTr,
  },
  props: {
    bills: {
      type: Array,
      required: true,
      default: Array,
    },
  },
  emits: ['editBillEvent'],
  setup(props, { emit }) {
    const editBillEvent = (id: number) => {
      emit('editBillEvent', id);
    };
    return {
      columns,
      editBillEvent,
    };
  },
});
</script>
