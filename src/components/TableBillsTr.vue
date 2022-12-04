<template>
  <q-tr>
    <slot />
    <q-td>
      <q-badge rounded v-if="!propsRow.row.isPaid" :color="'grey'">
        <q-tooltip
          anchor="bottom middle"
          transition-show="flip-right"
          transition-hide="flip-left"
        >
          {{ $t('page.notebook.table.bills.tooltips.pending') }}
        </q-tooltip>
      </q-badge>
      <span v-else class="text-primary">
        PG
        <q-tooltip
          anchor="bottom middle"
          transition-show="flip-right"
          transition-hide="flip-left"
        >
          {{ $t('page.notebook.table.bills.tooltips.paid') }}
        </q-tooltip>
      </span>
    </q-td>
    <q-td>
      <q-icon
        name="local_offer"
        v-if="propsRow.row.tag_id"
        :style="'color:' + propsRow.row.color + '!important;'"
        class="q-mr-sm"
      />
      <span>{{ propsRow.row.name }}</span>
    </q-td>
    <q-td>
      {{ $d(propsRow.row.due_date) }}
    </q-td>
    <q-td>
      {{ $n(parseFloat(propsRow.row.price), 'currency') }}
    </q-td>
    <q-td align="right">
      <div v-if="!propsRow.row.tag_id || expanded">
        <q-btn
          flat
          round
          icon="money_off_csred"
          :color="propsRow.row.is_paid ? 'success' : 'grey'"
          size="sm"
        >
          <q-tooltip
            anchor="bottom middle"
            transition-show="flip-right"
            transition-hide="flip-left"
          >
            {{ $t('page.notebook.table.bills.tooltips.markAsPaid') }}
          </q-tooltip>
        </q-btn>
        <q-btn flat round icon="edit" color="info" size="sm">
          <q-tooltip
            anchor="bottom middle"
            transition-show="flip-right"
            transition-hide="flip-left"
          >
            {{ $t('page.notebook.table.bills.tooltips.edit') }}
          </q-tooltip>
        </q-btn>
        <q-btn flat round icon="delete" color="negative" size="sm">
          <q-tooltip
            anchor="bottom middle"
            transition-show="flip-right"
            transition-hide="flip-left"
          >
            {{ $t('page.notebook.table.bills.tooltips.remove') }}
          </q-tooltip>
        </q-btn>
      </div>
    </q-td>
  </q-tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TableBill',
  props: ['propsRow', 'expanded'],
  setup() {
    return {};
  },
});
</script>
