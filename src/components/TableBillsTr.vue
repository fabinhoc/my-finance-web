<template>
  <q-tr>
    <slot />
    <q-td>
      <q-badge rounded v-if="!propsRow.row.is_paid" :color="'grey'">
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
      {{ formatDateString(propsRow.row.due_date) }}
    </q-td>
    <q-td>
      {{ $n(parseFloat(propsRow.row.price), 'currency') }}
    </q-td>
    <q-td>
      {{
        propsRow.row.total_paid
          ? $n(parseFloat(propsRow.row.total_paid), 'currency')
          : $n(parseFloat('0'), 'currency')
      }}
    </q-td>
    <q-td align="right">
      <div v-if="!propsRow.row.tag_id || expanded">
        <q-btn
          flat
          round
          icon="check"
          :color="'positive'"
          size="sm"
          @click="$emit('markBillAsPaid', propsRow.row.id)"
        >
          <q-tooltip
            anchor="bottom middle"
            transition-show="flip-right"
            transition-hide="flip-left"
          >
            {{ $t('page.notebook.table.bills.tooltips.markAsPaid') }}
          </q-tooltip>
        </q-btn>
        <q-btn
          flat
          round
          icon="edit"
          color="info"
          size="sm"
          @click="$emit('editBillEvent', propsRow.row.id)"
        >
          <q-tooltip
            anchor="bottom middle"
            transition-show="flip-right"
            transition-hide="flip-left"
          >
            {{ $t('page.notebook.table.bills.tooltips.edit') }}
          </q-tooltip>
        </q-btn>
        <q-btn
          flat
          round
          icon="delete"
          color="negative"
          size="sm"
          @click="$emit('deleteBillEvent', propsRow.row.id)"
        >
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
import dateHelper from 'src/helpers/date.helper';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'TableBill',
  props: ['propsRow', 'expanded'],
  setup() {
    const { locale } = useI18n();

    const formatDateString = (dateString: string) => {
      return dateHelper.formatDateToText(dateString, locale.value);
    };

    return {
      formatDateString,
    };
  },
});
</script>
