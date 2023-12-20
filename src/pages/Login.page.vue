<template>
  <q-page class="row items-center justify-evenly" align="center">
    <div class="col-md-3 col-sm-6 col-xs-10">
      <q-img
        src="/src/assets/logo.png"
        class="q-mb-lg"
        style="max-width: 100px"
      ></q-img>
      <q-form ref="myForm" class="q-gutter-y-lg" @submit.prevent="handleLogin">
        <q-input
          autofocus
          v-model="form.email"
          :label="$t('page.login.email')"
          lazy-rules
          :rules="[
            (val) => formValidation.required(val) || $t('validations.required'),
            (val) => formValidation.email(val) || $t('validations.email'),
            (val) => formValidation.string(val) || $t('validations.string'),
          ]"
        />

        <q-input
          v-model="form.password"
          :type="isPwd ? 'password' : 'text'"
          :label="$t('page.login.password')"
          :rules="[
            (val) => formValidation.required(val) || $t('validations.required'),
            (val) =>
              formValidation.minLength(val, 3) ||
              $t('validations.minLength.string', { minLength: 3 }),
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
          :label="$t('page.login.login')"
          outline
          rounded
          class="full-width"
          color="primary"
        />
      </q-form>

      <div class="q-mt-lg">
        <q-btn color="accent" flat to="/auth/forgot-password">{{
          $t('page.login.forgotPassword')
        }}</q-btn>
        <q-btn color="accent" flat to="/auth/sign-up">{{
          $t('page.login.signUp')
        }}</q-btn>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import useAuthService from 'src/services/auth.service';
import { LoginType } from 'src/types/Login.type';
import { defineComponent, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import formValidation from 'boot/form/validations';
import useNotify from 'src/composables/UseNotify';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const service = useAuthService();
    const router = useRouter();
    const notify = useNotify();
    const { t } = useI18n();

    const form: Ref<LoginType> = ref({
      email: null,
      password: null,
    });

    const handleLogin = async () => {
      try {
        await service.login(form.value);
        router.push({ name: 'dashboard' });
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
      isPwd: ref(true),
      handleLogin,
      formValidation,
    };
  },
});
</script>
