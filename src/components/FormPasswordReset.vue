<template>
  <q-form
    ref="formUpdatedPassword"
    class="q-gutter-y-lg"
    @submit.prevent="handleSubmit"
  >
    <q-input
      v-model="v$.password.$model"
      :type="isPwd ? 'password' : 'text'"
      :label="$t('page.profile.form.passwordReset.password')"
      lazy-rules
      :rules="[
        () => !v$.password.required.$invalid || $t('validations.required'),
      ]"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="handlePwd"
        />
      </template>
    </q-input>
    <q-input
      v-model="v$.password_confirmation.$model"
      :type="isPwdConfirm ? 'password' : 'text'"
      :label="$t('page.profile.form.passwordReset.confirmPassword')"
      lazy-rules
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
          :name="isPwdConfirm ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="handlePwdConfirm"
        />
      </template>
    </q-input>
    <q-btn
      type="submit"
      :label="$t('page.profile.form.passwordReset.save')"
      color="positive"
      :disable="v$.$invalid"
    />
    <q-btn
      type="button"
      :label="$t('page.profile.form.passwordReset.cancel')"
      outline
      color="negative"
      @click="clear"
      class="q-ml-sm"
    />
  </q-form>
</template>

<script lang="ts">
import { Ref, computed, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { required, sameAs } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import useNotify from 'src/composables/UseNotify';
import { useI18n } from 'vue-i18n';
import useUserService from 'src/services/User.service';
import { useAuthStore } from 'src/stores/auth.store';

export default defineComponent({
  name: 'FormUpdatePassword',
  setup() {
    const formUpdatedPassword = ref();
    const form: Ref<any> = ref({
      password: null,
      password_confirmation: null,
    });
    const rules = computed(() => {
      return {
        password: { required },
        password_confirmation: {
          required,
          sameAsPassword: sameAs(form.value.password),
        },
      };
    });
    const v$ = useVuelidate(rules, form);
    const isPwd: Ref<boolean> = ref(true);
    const isPwdConfirm: Ref<boolean> = ref(true);
    const service = useUserService();
    const notify = useNotify();
    const { t } = useI18n();

    const handlePwd = () => {
      isPwd.value = !isPwd.value;
    };

    const handlePwdConfirm = () => {
      isPwdConfirm.value = !isPwdConfirm.value;
    };

    const handleSubmit = async () => {
      try {
        const { user } = useAuthStore();
        await service.changePassword(user.id, form.value);
        notify.success(t('success'));
        clear();
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

    const clear = () => {
      form.value = {
        password: null,
        password_confirmation: null,
      };
      v$.value.$reset();
      formUpdatedPassword.value.reset();
    };

    return {
      handleSubmit,
      v$,
      isPwd,
      isPwdConfirm,
      handlePwd,
      handlePwdConfirm,
      formUpdatedPassword,
      clear,
    };
  },
});
</script>
