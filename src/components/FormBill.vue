<template>
  <q-card class="billCard">
    <q-card-section>
      <div>
        <q-icon
          name="add"
          size="2em"
          color="positive"
          style="margin-top: -6px"
        ></q-icon>
        <span class="text-h6">{{
          $t('page.notebook.form.bills.formTitle')
        }}</span>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-form @submit="onSubmit">
        <div class="row q-col-gutter-md">
          <div class="col-8">
            <q-select
              v-model="v$.notebook.$model"
              :options="notebooks"
              label="Notebooks"
              option-value="id"
              option-label="name"
              @input="v$.notebook.$touch()"
              :rules="[
                () =>
                  !v$.notebook.required.$invalid || $t('validations.required'),
              ]"
            />
          </div>
          <div class="col-4">
            <q-select
              v-model="v$.tag.$model"
              :options="tags"
              :label="$t('page.notebook.form.bills.addTag')"
              option-value="id"
              option-label="name"
              clearable
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <q-icon
                      name="local_offer"
                      :style="'color:' + scope.opt.color + '!important;'"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.name }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-9">
            <q-input
              autofocus
              v-model="v$.name.$model"
              :label="$t('page.notebook.form.bills.name')"
              lazy-rules
              :rules="[
                () => !v$.name.required.$invalid || $t('validations.required'),
              ]"
            />
          </div>
          <div class="col-3">
            <q-checkbox
              class="q-mt-md float-right"
              left-label
              v-model="v$.is_paid.$model"
              :label="$t('page.notebook.form.bills.isPaid') + '?'"
              lazy-rules
              :rules="[
                () =>
                  !v$.is_paid.required.$invalid || $t('validations.required'),
              ]"
            />
          </div>
          <div class="col-12" v-if="form.is_paid">
            <q-input
              v-model="v$.total_paid.$model"
              :label="$t('page.notebook.form.bills.totalPaid')"
              mask="#.##"
              fill-mask="0"
              reverse-fill-mask
              lazy-rules
              :rules="[
                () =>
                  !v$.total_paid.requiredIfIsPaid.$invalid ||
                  'Este campo é obrigatório quando ' +
                    $t('page.notebook.form.bills.isPaid') +
                    ' é verdadeiro',
              ]"
            />
          </div>
          <div class="col-12">
            <q-input
              v-model="v$.description.$model"
              :label="$t('page.notebook.form.bills.description')"
              lazy-rules
            />
          </div>
          <div class="col-6">
            <q-input
              v-model="v$.price.$model"
              :label="$t('page.notebook.form.bills.valueBill')"
              mask="#.##"
              fill-mask="0"
              reverse-fill-mask
              lazy-rules
              :rules="[
                () => !v$.price.required.$invalid || $t('validations.required'),
              ]"
            >
            </q-input>
          </div>
          <div class="col-6">
            <q-input
              v-model="v$.dueDate.$model"
              :mask="$t('page.notebook.form.bills.inputDateFormat')"
              :label="$t('page.notebook.form.bills.dueDate')"
              lazy-rules
              :rules="[
                (val) =>
                  formValidation.isValidDate(
                    val,
                    $t('page.notebook.form.bills.inputDateMask')
                  ) || $t('validations.date'),
                () =>
                  !v$.dueDate.required.$invalid || $t('validations.required'),
              ]"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="v$.dueDate.$model"
                      :mask="$t('page.notebook.form.bills.inputDateMask')"
                      :rules="[
                        (val) =>
                          formValidation.isValidDate(
                            val,
                            $t('page.notebook.form.bills.inputDateMask')
                          ) || $t('validations.date'),
                      ]"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
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
          />
        </q-card-actions>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, computed } from 'vue';
import formValidation from 'boot/form/validations';
import { useAuthStore } from 'src/stores/auth.store';
import { BillTypeDto } from 'src/types/Bill.type.dto';
import { useRoute } from 'vue-router';
import useNotebookService from 'src/services/Notebook.service';
import useTagService from 'src/services/Tag.service';
import { NotebookType } from 'src/types/Notebook.type';
import { TagType } from 'src/types/Tag.type';
import useBillService from 'src/services/Bill.service';
import useNotify from 'src/composables/UseNotify';
import dateHelper from 'src/helpers/date.helper';
import { useVuelidate } from '@vuelidate/core';
import { required, decimal, requiredIf, integer } from '@vuelidate/validators';

export default defineComponent({
  name: 'FormBill',
  emits: ['toggleDialog'],
  setup(props, { emit }) {
    const { user } = useAuthStore();
    const route = useRoute();
    const notebookService = useNotebookService();
    const tagService = useTagService();
    const billService = useBillService();
    const notify = useNotify();
    let closeDialog = ref(false);
    let notebooks: Ref<NotebookType[]> = ref([]);
    let tags: Ref<TagType[]> = ref([]);
    const notebookId: string =
      typeof route.params.id === 'object'
        ? route.params.id[0]
        : route.params.id;
    const form: Ref<any> = ref({
      name: null,
      notebook: null,
      tag: null,
      description: null,
      price: null,
      is_paid: false,
      total_paid: null,
      dueDate: null,
      tag_id: 0,
      user_id: user.id,
    });

    const rules = {
      name: { required },
      notebook: { required },
      tag: {},
      description: {},
      price: { required, decimal },
      is_paid: { required },
      total_paid: {
        requiredIfIsPaid: requiredIf(() => {
          return form.value.is_paid && form.value.total_paid === null;
        }),
      },
      dueDate: { required },
      tag_id: {},
      user_id: { integer },
    };

    const v$ = useVuelidate(rules, form);

    onMounted(async () => {
      notebooks.value = await notebookService.all();
      form.value.notebook = notebooks.value.filter((notebook) => {
        return notebook.id === parseInt(notebookId);
      })[0];
      tags.value = await tagService.all();
    });

    const onSubmit = async () => {
      try {
        const isFormCorrect = await v$.value.$validate();
        if (!isFormCorrect) return;
        const data: BillTypeDto = {
          name: form.value.name,
          notebookId: form.value.notebook?.id,
          description: form.value.description,
          tagId: form.value.tag?.id,
          price: form.value.price,
          isPaid: form.value.is_paid,
          dueDate: dateHelper.formatDateToDB(form.value.dueDate),
          userId: form.value.user_id,
          totalPaid: form.value.total_paid,
        };
        await billService.post(data);
        closeDialog.value = false;
        emit('toggleDialog', closeDialog.value);
        notify.success('Conta salva com sucesso!');
      } catch (error: any) {
        notify.error(error.response.data.errors[0].message);
      }
    };

    return {
      form,
      formValidation,
      notebooks,
      tags,
      onSubmit,
      closeDialog,
      v$,
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
