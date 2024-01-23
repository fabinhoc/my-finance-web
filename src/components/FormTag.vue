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
          $t('page.notebook.form.tag.formTitle')
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
            <q-input v-model="v$.color.$model">
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-color no-header v-model="v$.color.$model" />
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
import useVuelidate from '@vuelidate/core';
import { Ref, defineComponent, ref, onMounted } from 'vue';
import { required } from '@vuelidate/validators';
import useNotify from 'src/composables/UseNotify';
import { useI18n } from 'vue-i18n';
import useTagService from 'src/services/Tag.service';
import { TagInputType } from 'src/types/inputs/Tag.input.type';

export default defineComponent({
  emits: ['toggleDialog'],
  props: {
    tag: {
      required: false,
      type: Object,
    },
  },
  setup(props, { emit }) {
    const form: Ref<TagInputType> = ref({
      name: null,
      color: null,
    });
    const rules: any = {
      name: { required },
      color: { required },
    };
    const v$ = useVuelidate(rules, form);
    let closeDialog = ref(false);
    const notify = useNotify();
    const { t } = useI18n();
    const tagService = useTagService();

    onMounted(() => {
      if (props.tag) {
        form.value = {
          name: props.tag.name,
          color: props.tag.color,
        };
      }
    });

    const onSubmit = () => {
      if (props.tag) {
        editTag();
        return;
      }
      saveTag();
    };

    const saveTag = async () => {
      try {
        await tagService.post(form.value);
        notify.success(t('success'));
        closeDialog.value = false;
        emit('toggleDialog', closeDialog.value);
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

    const editTag = async () => {
      try {
        const data = {
          name: form.value.name,
          color: form.value.color,
          user_id: form.value.user_id,
        };
        await tagService.put(props.tag?.id, data);
        notify.success(t('success'));
        closeDialog.value = false;
        emit('toggleDialog', closeDialog.value);
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
      v$,
      closeDialog,
      onSubmit,
    };
  },
});
</script>
