<template>
  <q-form ref="myForm" class="q-gutter-y-lg" @submit.prevent="handleSubmit">
    <q-input
      v-model="v$.password.$model"
      :type="isPwd ? 'password' : 'text'"
      :label="$t('page.resetPassword.formResetPassword.password')"
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
      :label="$t('page.resetPassword.formResetPassword.passwordConfirmation')"
      lazy-rules
      :rules="[
        () =>
          !v$.password_confirmation.sameAs.$invalid ||
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
      :label="$t('page.resetPassword.formResetPassword.save')"
      outline
      rounded
      class="full-width"
      color="primary"
      :disable="v$.$invalid"
      :loading="loadingRequest"
    />
  </q-form>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, sameAs } from '@vuelidate/validators';
import useAuthService from 'src/services/auth.service';
import useNotify from 'src/composables/UseNotify';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'FormResetPassword',
  setup() {
    const form: Ref<any> = ref({
      token: null,
      email: null,
      password: null,
      password_confirmation: null,
    });
    const isPwd: Ref<boolean> = ref(true);
    const isPwdConfirm: Ref<boolean> = ref(true);
    const rules = computed(() => {
      return {
        password: { required },
        password_confirmation: {
          sameAs: sameAs(form.value.password),
        },
      };
    });
    const v$ = useVuelidate(rules, form);
    const service = useAuthService();
    const notify = useNotify();
    const route = useRoute();
    const router = useRouter();
    const countDown: Ref<number> = ref(3);
    const { t } = useI18n();
    const loadingRequest: Ref<boolean> = ref(false);

    onMounted(() => {
      form.value.token = (route.query.token as string) ?? null;
      form.value.email = (route.query.email as string) ?? null;
    });

    const handlePwd = () => {
      isPwd.value = !isPwd.value;
    };

    const handlePwdConfirm = () => {
      isPwdConfirm.value = !isPwdConfirm.value;
    };

    const startCountdown = () => {
      const notification = notify.success(
        t('page.resetPassword.messageSuccess'),
        t('page.resetPassword.seconds', { seconds: countDown.value }),
        false
      );
      let timer = setInterval(() => {
        countDown.value--;
        if (countDown.value === 0) {
          clearInterval(timer);
        }
        notification({
          caption: t('page.resetPassword.seconds', {
            seconds: countDown.value,
          }),
        });
      }, 1000);
    };

    const handleSubmit = async () => {
      try {
        loadingRequest.value = true;
        const validate = await v$.value.$validate();
        if (!validate) return false;
        await service.resetPassword(form.value);
        startCountdown();
        loadingRequest.value = false;
        setTimeout(() => {
          router.push({ name: 'login' });
        }, 3000);
      } catch (error: any) {
        console.log(error);
        const message = error?.response?.data?.message ?? error;
        notify.error(message);
      }
    };
    return {
      form,
      v$,
      isPwd,
      handlePwd,
      handleSubmit,
      isPwdConfirm,
      handlePwdConfirm,
      loadingRequest,
    };
  },
});
</script>
