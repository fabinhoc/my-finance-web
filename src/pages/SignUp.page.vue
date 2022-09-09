<template>
  <q-page class="row items-center justify-evenly" align="center">
    <div class="col-md-3 col-sm-6 col-xs-10">
      <q-form class="q-gutter-y-lg" @submit.prevent="handleRegister">
        <q-input
          autofocus
          v-model="form.name"
          :label="$t('page.signUp.name')"
          lazy-rules
          :rules="[
            (val) => formValidation.required(val) || $t('validations.required'),
            (val) => formValidation.string(val) || $t('validations.string'),
            (val) =>
              formValidation.minLength(val, 3) || $t('validations.minLength'),
          ]"
        />

        <q-input
          v-model="form.email"
          :label="$t('page.signUp.email')"
          lazy-rules
          :rules="[
            (val) => formValidation.required(val) || $t('validations.required'),
            (val) => formValidation.email(val) || $t('validations.email'),
            (val) => formValidation.string(val) || $t('validations.string'),
            (val) =>
              formValidation.minLength(val, 3) || $t('validations.minLength'),
          ]"
        />

        <q-input
          v-model="form.password"
          :type="isPwd ? 'password' : 'text'"
          :label="$t('page.login.password')"
          :rules="[
            (val) => formValidation.required(val) || $t('validations.required'),
            (val) =>
              formValidation.minLength(val, 6) ||
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

        <q-input
          v-model="form.password_confirmation"
          :type="isPwd ? 'password' : 'text'"
          :label="$t('page.signUp.passwordConfirmation')"
          :rules="[
            (val) => formValidation.required(val) || $t('validations.required'),
            (val) =>
              formValidation.minLength(val, 6) ||
              $t('validations.minLength.string', { minLength: 3 }),
            (val) =>
              formValidation.confirm(val, form.password) ||
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
        />
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import useAuthService from 'src/services/auth.service';
import { RegisterType } from 'src/types/Register.type';
import formValidation from 'boot/form/validations';

export default defineComponent({
  name: 'SignUpPage',
  setup() {
    const service = useAuthService();

    const form = ref({
      name: null,
      email: null,
      password: null,
      password_confirmation: null,
    });

    const handleRegister = async () => {
      try {
        const response = await service.register({
          name: form.value.name,
          email: form.value.email,
          password: form.value.password,
        } as RegisterType);

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    return {
      form,
      isPwd: ref(true),
      handleRegister,
      formValidation,
    };
  },
});
</script>
