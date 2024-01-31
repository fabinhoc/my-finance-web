<template>
  <q-card class="billCard">
    <q-card-section>
      <div>
        <q-icon
          name="content_copy"
          size="2em"
          color="positive"
          style="margin-top: -6px"
        ></q-icon>
        <span class="text-h6">{{
          $t('page.notebook.form.duplicateBill.formTitle')
        }}</span>
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-form @submit="onSubmit">
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-select
              v-model="v$.duplicateMonth.$model"
              :options="months"
              :label="$t('page.notebook.form.duplicateBill.selectMonth')"
              option-value="monthInNumber"
              option-label="stringMonth"
              clearable
              :rules="[
                () =>
                  !v$.duplicateMonth.required.$invalid ||
                  $t('validations.required'),
              ]"
              emit-value
              map-options
            >
              <template v-slot:selected-item="scope">
                {{ $t(scope.opt.stringMonth) }}
              </template>
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section>
                    <q-item-label>{{ $t(scope.opt.stringMonth) }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-12">
            <q-input
              type="number"
              autofocus
              v-model="v$.duplicateYear.$model"
              :label="$t('page.notebook.form.duplicateBill.selectYear')"
              lazy-rules
              :rules="[
                () =>
                  !v$.duplicateYear.required.$invalid ||
                  $t('validations.required'),
                () =>
                  !v$.duplicateYear.minValue.$invalid ||
                  $t('validations.minValue', { minValue: 1900 }),
              ]"
            />
          </div>
        </div>
        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            :label="$t('page.notebook.form.bills.cancel')"
            v-close-popup
          />
          <q-btn
            type="submit"
            flat
            :label="$t('page.notebook.form.bills.save')"
            v-close-popup="closeDialog"
            :disable="v$.$invalid"
            :loading="loadingRequest"
          />
        </q-card-actions>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { MonthType } from 'src/types/Month.type';
import { useVuelidate } from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';
import { DuplicateBillInputType } from 'src/types/inputs/DuplicateBill.input.type';
import { DuplicateBillType } from 'src/types/DuplicateBill.type';
import { storeToRefs } from 'pinia';
import { useMonth } from 'src/stores/month.store';
import { useYear } from 'src/stores/year.store';
import { useRoute } from 'vue-router';
import { useAuthStore } from 'src/stores/auth.store';
import useBillService from 'src/services/Bill.service';
import useNotify from 'src/composables/UseNotify';
import { useI18n } from 'vue-i18n';

const months = [
  {
    monthInNumber: '01',
    stringMonth: 'months.january',
  },
  {
    monthInNumber: '02',
    stringMonth: 'months.february',
  },
  {
    monthInNumber: '03',
    stringMonth: 'months.march',
  },
  {
    monthInNumber: '04',
    stringMonth: 'months.april',
  },
  {
    monthInNumber: '05',
    stringMonth: 'months.may',
  },
  {
    monthInNumber: '06',
    stringMonth: 'months.june',
  },
  {
    monthInNumber: '07',
    stringMonth: 'months.july',
  },
  {
    monthInNumber: '08',
    stringMonth: 'months.august',
  },
  {
    monthInNumber: '09',
    stringMonth: 'months.september',
  },
  {
    monthInNumber: '10',
    stringMonth: 'months.october',
  },
  {
    monthInNumber: '11',
    stringMonth: 'months.november',
  },
  {
    monthInNumber: '12',
    stringMonth: 'months.december',
  },
] as MonthType[];

export default defineComponent({
  name: 'FormDuplicateBill',
  emits: ['toggleDialog'],
  setup(props, { emit }) {
    const { year } = storeToRefs(useYear());
    const form: Ref<DuplicateBillInputType> = ref({
      duplicateYear: year.value,
      duplicateMonth: null,
    });
    const rules = {
      duplicateYear: { required, minValue: minValue(1900) },
      duplicateMonth: { required },
    };
    const v$ = useVuelidate(rules, form);
    const route = useRoute();
    const notebookId: string =
      typeof route.params.id === 'object'
        ? route.params.id[0]
        : route.params.id;
    const { user } = useAuthStore();
    const closeDialog: Ref<boolean> = ref(false);
    const loadingRequest: Ref<boolean> = ref(false);
    const billService = useBillService();
    const notify = useNotify();
    const { t } = useI18n();
    const { setMonth } = useMonth();
    const { setYear } = useYear();

    const onSubmit = async () => {
      const { month } = storeToRefs(useMonth());
      const { year } = storeToRefs(useYear());

      const payload: DuplicateBillType = {
        month: month.value.monthInNumber,
        year: year.value,
        notebook_id: parseInt(notebookId),
        duplicateMonth: form.value.duplicateMonth ?? '01',
        duplicateYear: form.value.duplicateYear ?? 1900,
        user_id: user.id,
      };

      try {
        loadingRequest.value = true;
        await billService.duplicateBill(payload);
        closeDialog.value = false;
        emit('toggleDialog', closeDialog.value);
        notify.success(t('success'));
        const montValue: string = form.value.duplicateMonth?.toString() ?? '01';
        const monthValueSelected = months.filter((month: MonthType) => {
          return month.monthInNumber === montValue;
        })[0];
        setMonth({
          monthInNumber: monthValueSelected.monthInNumber,
          stringMonth: monthValueSelected.stringMonth,
        });
        const yearSelected: number = form.value.duplicateYear ?? 1900;
        setYear(yearSelected);
        loadingRequest.value = false;
      } catch (error: any) {
        if (error.response) {
          notify.error(error.response.data.message);
          return;
        }
        let message = error.message;
        if (error.message === 'Network Error') {
          message = t('errors.network');
        }
        notify.error(message);
        loadingRequest.value = false;
      }
    };
    return {
      months,
      onSubmit,
      v$,
      closeDialog,
      loadingRequest,
    };
  },
});
</script>

<style scoped lang="scss">
body.screen--lg {
  .billCard {
    min-width: 40%;
  }
}
body.screen--md {
  .billCard {
    min-width: 95%;
  }
}

body.screen--sm {
  .billCard {
    min-width: 95%;
  }
}
body.screen--xs {
  .billCard {
    min-width: 95%;
  }
}
</style>
