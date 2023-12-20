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
          $t('page.notebook.form.notebook.formTitle')
        }}</span>
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-form @submit="onSubmit">
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-input
              autofocus
              v-model="v$.name.$model"
              :label="$t('page.notebook.form.notebook.name')"
              lazy-rules
              :rules="[
                () => !v$.name.required.$invalid || $t('validations.required'),
              ]"
            />
          </div>
          <div class="col-12">
            <q-input
              v-model="v$.description.$model"
              :label="$t('page.notebook.form.notebook.description')"
              lazy-rules
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
          />
        </q-card-actions>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import useNotify from 'src/composables/UseNotify';
import { useI18n } from 'vue-i18n';
import useNotebookService from 'src/services/Notebook.service';
import { useMenuStore } from 'src/stores/menu.store';

export default defineComponent({
  emits: ['toggleDialog'],
  props: {
    notebook: {
      required: false,
      type: Object,
    },
  },
  setup(props, { emit }) {
    const form: Ref<any> = ref({
      name: null,
      description: null,
    });
    const rules = {
      name: { required },
      description: {},
    };
    const v$ = useVuelidate(rules, form);
    let closeDialog = ref(false);
    const notify = useNotify();
    const { t } = useI18n();
    const notebookService = useNotebookService();
    const { setUpdateMenuNotebook } = useMenuStore();

    onMounted(async () => {
      if (props.notebook) {
        form.value = props.notebook;
      }
    });

    const onSubmit = () => {
      if (props.notebook) {
        editNotebook();
        setUpdateMenuNotebook(true);
        return;
      }
      saveNotebook();
      setUpdateMenuNotebook(true);
    };

    const saveNotebook = async () => {
      try {
        const response = await notebookService.post(form.value);
        notify.success(t('success'));
        closeDialog.value = false;
        emit('toggleDialog', { close: closeDialog.value, notebook: response });
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
      }
    };

    const editNotebook = async () => {
      try {
        await notebookService.put(props.notebook?.id, form.value);
        notify.success(t('success'));
        closeDialog.value = false;
        emit('toggleDialog', {
          close: closeDialog.value,
          notebook: props.notebook,
        });
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
      }
    };

    return {
      onSubmit,
      v$,
      closeDialog,
    };
  },
});
</script>
