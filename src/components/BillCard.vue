<template>
  <q-card bordered flat>
    <q-card-section class="q-mb-none q-pb-none">
      <div class="row">
        <div class="col">
          <span class="text-h6 text-weight-medium">Cartão Stéfany</span>
        </div>
        <q-space />
        <div class="col-1 column items-end">
          <q-icon name="local_offer" class="q-mt-xs"></q-icon>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="text-subtitle2 text-weight-regular text-grey-6">Pendente</div>
      <p class="text-weight-regular">Total: R$ 2.000,00</p>
    </q-card-section>
    <q-card-section class="q-pb-none">
      <div class="row">
        <div class="col">
          <span class="text-subtitle1 text-weight-light text-grey-7"
            >Cartão Nubank</span
          >
        </div>
        <q-space />
        <div class="col-1 column items-end">
          <span class="text-primary">
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
        <span>R$ 2000,00</span>
        <q-icon name="calendar_month" class="q-ml-sm"></q-icon>
        <span>25/01/2024</span>
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div>
        <q-btn flat round icon="check" :color="'positive'" size="sm">
          <q-tooltip
            anchor="bottom middle"
            transition-show="flip-right"
            transition-hide="flip-left"
          >
            {{ $t('page.notebook.card.bills.tooltips.markAsPaid') }}
          </q-tooltip>
        </q-btn>
        <q-btn flat round icon="edit" color="info" size="sm">
          <q-tooltip
            anchor="bottom middle"
            transition-show="flip-right"
            transition-hide="flip-left"
          >
            {{ $t('page.notebook.card.bills.tooltips.edit') }}
          </q-tooltip>
        </q-btn>
        <q-btn flat round icon="delete" color="negative" size="sm">
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
    <q-card-section class="q-pb-none">
      <div class="row">
        <div class="col">
          <span class="text-body2 text-weight-light text-grey-7"
            >Cartão Banco do Brasil</span
          >
        </div>
        <q-space />
        <div class="col-1 column items-end">
          <!-- <span class="text-primary">
            PG
            <q-tooltip
              anchor="bottom middle"
              transition-show="flip-right"
              transition-hide="flip-left"
            >
              {{ $t('page.notebook.card.bills.tooltips.paid') }}
            </q-tooltip>
          </span> -->
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none q-pb-none">
      <div style="font-size: 0.75rem" class="text-weight-regular">
        <span>R$ 2000,00</span>
        <q-icon name="calendar_month" class="q-ml-sm"></q-icon>
        <span>25/01/2024</span>
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div>
        <q-btn flat round icon="check" :color="'positive'" size="sm">
          <q-tooltip
            anchor="bottom middle"
            transition-show="flip-right"
            transition-hide="flip-left"
          >
            {{ $t('page.notebook.card.bills.tooltips.markAsPaid') }}
          </q-tooltip>
        </q-btn>
        <q-btn flat round icon="edit" color="info" size="sm">
          <q-tooltip
            anchor="bottom middle"
            transition-show="flip-right"
            transition-hide="flip-left"
          >
            {{ $t('page.notebook.card.bills.tooltips.edit') }}
          </q-tooltip>
        </q-btn>
        <q-btn flat round icon="delete" color="negative" size="sm">
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
    <q-card-section>
      <div style="font-size: 0.75rem" class="text-weight-regular">
        <div class="text-weight-regular">Total Pago:</div>
        <span class="text-subtitle1 text-weight-medium">R$ 2000,00</span>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BillCard',
  setup() {
    return {};
  },
});
</script>
