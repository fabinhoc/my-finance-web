<template>
  <q-page padding>
    <q-card bordered flat>
      <q-card-section>
        <HeaderPage
          :title="$t('page.profile.title')"
          :description="$t('page.profile.description')"
        />
      </q-card-section>
      <q-separator class="q-mt-md" inset />
      <q-card-section>
        <p class="text-subtitle2 text-uppercase">
          {{ $t('page.profile.about') }}
        </p>
        <FormUpdateProfile />
      </q-card-section>
      <q-separator class="q-mt-md" inset />
      <q-card-section>
        <p class="text-subtitle2 text-uppercase">
          {{ $t('page.profile.passwordChange') }}
        </p>
        <FormPasswordReset />
      </q-card-section>
      <q-card-section>
        <p class="text-subtitle2 text-uppercase">
          {{ $t('page.profile.account') }}
        </p>
        <q-btn color="negative" @click="removeAccount">{{
          $t('page.profile.deleteAccount')
        }}</q-btn>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderPage from 'src/components/HeaderPage.vue';
import FormUpdateProfile from 'src/components/FormUpdateProfile.vue';
import FormPasswordReset from 'src/components/FormPasswordReset.vue';
import useUserService from 'src/services/User.service';
import useNotify from 'src/composables/UseNotify';
import { useAuthStore } from 'src/stores/auth.store';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ProfilePage',
  components: {
    HeaderPage,
    FormUpdateProfile,
    FormPasswordReset,
  },
  setup() {
    const service = useUserService();
    const notify = useNotify();
    const { user, removeUserStore } = useAuthStore();
    const { t } = useI18n();
    const $q = useQuasar();
    const router = useRouter();

    const removeAccount = async () => {
      $q.dialog({
        title: t('page.profile.dialogTitle'),
        message: t('page.profile.dialogDescription'),
        cancel: {
          text: t('page.profile.cancel'),
        },
        persistent: true,
      }).onOk(async () => {
        try {
          await service.remove(user.id);
          removeUserStore();
          router.push({ name: 'login' });
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
      });
    };
    return { removeAccount };
  },
});
</script>
