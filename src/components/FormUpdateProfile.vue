<template>
  <q-form @submit="onSubmit">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-input
          autofocus
          v-model="v$.name.$model"
          :label="$t('page.profile.form.profile.name')"
          lazy-rules
          :error="v$.name.$invalid"
          :error-message="v$.name?.$errors[0]?.$message.toString()"
          :rules="[
            () => !v$.name.required.$invalid || $t('validations.required'),
          ]"
        />
      </div>
      <div class="col-12">
        <q-input
          autofocus
          v-model="v$.email.$model"
          :label="$t('page.profile.form.profile.email')"
          lazy-rules
          :error="v$.email.$invalid"
          :error-message="v$.email?.$errors[0]?.$message.toString()"
          :rules="[
            () => !v$.email.required.$invalid || $t('validations.required'),
          ]"
        />
      </div>
    </div>
    <q-card-actions>
      <q-btn
        type="submit"
        color="positive"
        :label="$t('page.profile.form.profile.save')"
      />
    </q-card-actions>
  </q-form>
</template>

<script lang="ts">
import useVuelidate from '@vuelidate/core';
import { Ref, defineComponent, ref } from 'vue';
import { required } from '@vuelidate/validators';
import useNotify from 'src/composables/UseNotify';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from 'src/stores/auth.store';
import useUserService from 'src/services/User.service';

export default defineComponent({
  setup() {
    const { user, setUser } = useAuthStore();
    const form: Ref<any> = ref({
      name: user.name,
      email: user.email,
    });
    const rules = {
      name: { required },
      email: { required },
    };
    const $externalResults = ref({});
    const v$ = useVuelidate(rules, form, { $externalResults });
    let closeDialog = ref(false);
    const notify = useNotify();
    const { t } = useI18n();
    const userService = useUserService();

    const onSubmit = async () => {
      try {
        v$.value.$clearExternalResults();
        await userService.put(user.id, form.value);
        notify.success(t('success'));
        closeDialog.value = false;
        setUser();
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
      }
    };

    return {
      v$,
      onSubmit,
    };
  },
});
</script>
