<template>
  <q-form class="q-gutter-y-lg" @submit.prevent="handleRegister">
    <q-input
      autofocus
      v-model="v$.name.$model"
      :label="$t('page.signUp.name')"
      lazy-rules
      :error="v$.name.$dirty && v$.name.$invalid"
      :error-message="
        v$.name.$externalResults.length
          ? v$.name?.$errors[0]?.$message.toString()
          : ''
      "
      :rules="[() => !v$.name.required.$invalid || $t('validations.required')]"
    />
    <q-input
      v-model="v$.email.$model"
      :label="$t('page.signUp.email')"
      lazy-rules
      :error="v$.email.$dirty && v$.email.$invalid"
      :error-message="
        v$.email.$externalResults.length
          ? v$.email?.$errors[0]?.$message.toString()
          : ''
      "
      :rules="[
        () => !v$.email.required.$invalid || $t('validations.required'),
        () => !v$.email.email.$invalid || $t('validations.email'),
      ]"
    />

    <q-input
      v-model="v$.password.$model"
      :type="isPwd ? 'password' : 'text'"
      :label="$t('page.login.password')"
      :error="v$.password.$dirty && v$.password.$invalid"
      :error-message="
        v$.password.$externalResults.length
          ? v$.password?.$errors[0]?.$message.toString()
          : ''
      "
      :rules="[
        () => !v$.password.required.$invalid || $t('validations.required'),
      ]"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>

    <q-input
      v-model="v$.password_confirmation.$model"
      :type="isPwd ? 'password' : 'text'"
      :label="$t('page.signUp.passwordConfirmation')"
      :error="
        v$.password_confirmation.$dirty && v$.password_confirmation.$invalid
      "
      :error-message="
        v$.password_confirmation.$externalResults.length
          ? v$.password_confirmation?.$errors[0]?.$message.toString()
          : ''
      "
      :rules="[
        () =>
          !v$.password_confirmation.required.$invalid ||
          $t('validations.required'),
        () =>
          !v$.password_confirmation.sameAsPassword.$invalid ||
          $t('validations.passwordConfirmation'),
      ]"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>

    <q-btn
      type="submit"
      :label="$t('page.signUp.register')"
      outline
      rounded
      class="full-width"
      color="primary"
      :loading="loadingRequest"
    />

    <q-btn color="accent" flat to="/auth/login">{{
      $t('page.signUp.alreadyRegistered')
    }}</q-btn>
  </q-form>
</template>

<script lang="ts">
import { Ref, computed, defineComponent, ref } from 'vue';
import useAuthService from 'src/services/auth.service';
import { RegisterType } from 'src/types/Register.type';
import formValidation from 'boot/form/validations';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required, email, sameAs } from '@vuelidate/validators';
import useNotify from 'src/composables/UseNotify';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'FormSignUp',
  setup() {
    const service = useAuthService();
    const router = useRouter();
    const notify = useNotify();
    const { t } = useI18n();
    const loadingRequest: Ref<boolean> = ref(false);
    const form = ref({
      name: null,
      email: null,
      password: null,
      password_confirmation: null,
    });
    const rules = computed(() => {
      return {
        name: { required },
        email: { required, email },
        password: { required },
        password_confirmation: {
          required,
          sameAsPassword: sameAs(form.value.password),
        },
      };
    });
    const $externalResults = ref({});
    const v$ = useVuelidate(rules, form, { $externalResults });

    const handleRegister = async () => {
      try {
        loadingRequest.value = true;
        v$.value.$clearExternalResults();
        const validate = await v$.value.$validate();
        if (!validate) return false;
        await service.register({
          name: form.value.name,
          email: form.value.email,
          password: form.value.password,
          password_confirmation: form.value.password_confirmation,
        } as RegisterType);
        loadingRequest.value = false;
        await router.push({ name: 'email-verification' });
      } catch (error: any) {
        if (error.response) {
          $externalResults.value = error.response.data.errors;
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
      form,
      isPwd: ref(true),
      handleRegister,
      formValidation,
      v$,
      loadingRequest,
    };
  },
});
</script>
