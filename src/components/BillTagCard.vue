<template>
  <q-card-section class="q-pb-none">
    <div class="row">
      <div class="col">
        <span class="text-subtitle1 text-weight-light text-grey-7">{{
          tagBill?.name
        }}</span>
      </div>
      <q-space />
      <div class="col-1 column items-end">
        <span class="text-primary" v-if="tagBill?.is_paid">
          PG
          <q-tooltip
            anchor="bottom middle"
            transition-show="flip-right"
            transition-hide="flip-left"
          >
            {{ $t('page.notebook.card.bills.tooltips.paid') }}
          </q-tooltip>
        </span>
      </div>
    </div>
  </q-card-section>
  <q-card-section class="q-pt-none q-pb-none">
    <div class="text-weight-regular">
      <span>{{ $n(parseFloat(tagBill?.price), 'currency') }}</span>
      <q-icon name="calendar_month" class="q-ml-sm"></q-icon>
      <span>{{ formatDateString(tagBill?.due_date) }}</span>
    </div>
  </q-card-section>
  <q-card-section class="q-pt-none">
    <div>
      <q-btn
        flat
        round
        icon="check"
        :color="'positive'"
        size="sm"
        @click="markBillAsPaid(tagBill?.id)"
      >
        <q-tooltip
          anchor="bottom middle"
          transition-show="flip-right"
          transition-hide="flip-left"
        >
          {{ $t('page.notebook.card.bills.tooltips.markAsPaid') }}
        </q-tooltip>
      </q-btn>
      <q-btn
        flat
        round
        icon="edit"
        color="info"
        size="sm"
        @click="editBillEvent(tagBill?.id)"
      >
        <q-tooltip
          anchor="bottom middle"
          transition-show="flip-right"
          transition-hide="flip-left"
        >
          {{ $t('page.notebook.card.bills.tooltips.edit') }}
        </q-tooltip>
      </q-btn>
      <q-btn
        flat
        round
        icon="delete"
        color="negative"
        size="sm"
        @click="deleteBillEvent(tagBill?.id)"
      >
        <q-tooltip
          anchor="bottom middle"
          transition-show="flip-right"
          transition-hide="flip-left"
        >
          {{ $t('page.notebook.card.bills.tooltips.remove') }}
        </q-tooltip>
      </q-btn>
    </div>
  </q-card-section>
  <q-separator class="q-mt-sm" inset />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import dateHelper from 'src/helpers/date.helper';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'BillTagCard',
  emits: ['editBillEvent', 'deleteBillEvent', 'markBillAsPaid'],
  props: {
    tagBill: {
      type: Object,
      required: true,
      default: Object,
    },
  },
  setup(props, { emit }) {
    const { locale } = useI18n();
    const editBillEvent = (id: number) => {
      emit('editBillEvent', id);
    };
    const deleteBillEvent = (id: number) => {
      emit('deleteBillEvent', id);
    };
    const markBillAsPaid = (id: number) => {
      emit('markBillAsPaid', id);
    };
    const formatDateString = (dateString: string) => {
      return dateHelper.formatDateToText(dateString, locale.value);
    };
    return {
      editBillEvent,
      deleteBillEvent,
      markBillAsPaid,
      formatDateString,
    };
  },
});
</script>
