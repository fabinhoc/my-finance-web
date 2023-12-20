<template>
  <q-form ref="myForm" class="q-gutter-y-lg" @submit.prevent="handleSubmit">
    <q-input
      v-model="v$.email.$model"
      :label="$t('page.forgotPassword.form.forgotPassword.email')"
      lazy-rules
      :rules="[
        () => !v$.email.required.$invalid || $t('validations.required'),
        () => !v$.email.email.$invalid || $t('validations.email'),
      ]"
    />
    <q-btn
      type="submit"
      :label="$t('page.forgotPassword.form.forgotPassword.reset')"
      outline
      rounded
      class="full-width"
      color="primary"
      :disable="v$.$invalid"
    />
  </q-form>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import useAuthService from 'src/services/auth.service';
import { useRouter } from 'vue-router';
import useNotify from 'src/composables/UseNotify';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'FormForgotPassword',
  setup() {
    const form: Ref<any> = ref({
      email: null,
    });
    const isPwd: Ref<boolean> = ref(true);
    const rules = {
      email: { email, required },
    };
    const v$ = useVuelidate(rules, form);
    const service = useAuthService();
    const router = useRouter();
    const notify = useNotify();
    const { t } = useI18n();

    const handlePwd = () => {
      isPwd.value = !isPwd.value;
    };

    const handleSubmit = async () => {
      try {
        const validate = await v$.value.$validate();
        if (!validate) return false;
        await service.forgotPassword(form.value);
        router.push({ name: 'resetPasswordConfirmation' });
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
      form,
      v$,
      isPwd,
      handlePwd,
      handleSubmit,
    };
  },
});
</script>
