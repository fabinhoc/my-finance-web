<template>
  <q-card bordered flat>
    <q-card-section class="q-mb-none q-pb-none">
      <div class="row">
        <div class="col">
          <span class="text-h6 text-weight-medium">{{ bill?.name }}</span>
        </div>
        <q-space />
        <div v-if="bill?.tag_id" class="col-1 column items-end">
          <q-icon
            :style="'color:' + bill.color + '!important;'"
            name="local_offer"
            class="q-mt-xs"
          ></q-icon>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pb-none q-pt-none">
      <span class="text-primary" v-if="bill?.is_paid">
        PG
        <q-tooltip
          anchor="bottom middle"
          transition-show="flip-right"
          transition-hide="flip-left"
        >
          {{ $t('page.notebook.card.bills.tooltips.paid') }}
        </q-tooltip>
      </span>
      <div v-else class="text-subtitle2 text-weight-regular text-grey-6">
        {{
          !bill?.tag_id ? $t('page.notebook.card.bills.tooltips.pending') : '--'
        }}
      </div>
      <div class="text-weight-regular">
        <span>{{ $n(parseFloat(bill?.price), 'currency') }}</span>
        <q-icon
          v-if="!bill?.tag_id"
          name="calendar_month"
          class="q-ml-sm"
        ></q-icon>
        <span v-if="!bill?.tag_id">{{ formatDateString(bill?.due_date) }}</span>
      </div>
    </q-card-section>
    <q-card-section
      class="q-pt-none"
      style="padding-bottom: 19px"
      v-if="!bill?.tag_id"
    >
      <div>
        <q-btn
          flat
          round
          icon="check"
          :color="'positive'"
          size="sm"
          @click="markBillAsPaid(bill?.id)"
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
          @click="editBillEvent(bill?.id)"
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
          @click="deleteBillEvent(bill?.id)"
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
    <slot />
    <!-- <div v-for="tagBill in bill?.bills" :key="tagBill.id">
      <BillTagCard
        :tagBill="tagBill"
        @edit-bill-event="editBillEvent"
        @delete-bill-event="deleteBillEvent"
        @mark-bill-as-paid="markBillAsPaid"
      />
    </div> -->
    <q-card-section>
      <div style="font-size: 0.75rem" class="text-weight-regular">
        <div class="text-weight-regular">
          {{ $t('page.notebook.card.bills.totalPaid') }}:
        </div>
        <span class="text-subtitle1 text-weight-medium">{{
          bill?.total_paid
            ? $n(parseFloat(bill?.total_paid), 'currency')
            : $n(parseFloat('0'), 'currency')
        }}</span>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import dateHelper from 'src/helpers/date.helper';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'BillCard',
  emits: ['editBillEvent', 'deleteBillEvent', 'markBillAsPaid'],
  components: {},
  props: {
    bill: {
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
