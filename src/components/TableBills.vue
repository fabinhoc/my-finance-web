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
            <q-btn flat round icon="delete" color="negative" size="sm"></q-btn>
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
              <template v-slot:body-cell-isPaid="props">
                <q-td :props="props">
                  <q-badge rounded v-if="!props.row.isPaid" :color="'grey'" />
                  <span v-else class="text-primary">PG</span>
                </q-td>
              </template>
              <template v-slot:body-cell-price="props">
                <q-td>
                  {{ $n(parseFloat(props.row.price), 'currency') }}
                </q-td>
              </template>
              <template v-slot:body-cell-dueDate="props">
                <q-td>
                  {{ $d(props.row.due_date) }}
                </q-td>
              </template>
              <template v-slot:body-cell-action="props">
                <q-td align="right">
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
                </q-td>
              </template>
            </q-table>
          </div>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { QTableProps } from 'quasar';

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
  props: {
    bills: {
      type: Array,
      required: true,
      default: Array,
    },
  },
  setup() {
    return {
      columns,
    };
  },
});
</script>
