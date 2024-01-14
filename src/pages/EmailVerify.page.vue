<template>
  <q-page class="row items-center justify-evenly" align="center">
    <div class="col-md-4 col-sm-6 col-xs-10">
      <q-card
        class="text-center"
        flat
        :square="false"
        style="background-color: transparent"
      >
        <q-img src="/logo.png" class="q-mb-lg" style="max-width: 200px"></q-img>
        <q-card-section>
          <q-avatar
            size="80px"
            font-size="32px"
            color="grey-3"
            text-color="primary"
            icon="email"
          />
        </q-card-section>
        <q-card-section>
          <p class="text-h5 text-weight-medium">
            {{ $t('page.emailVerify.title') }}
          </p>
        </q-card-section>
        <q-card-section>
          <p class="">
            {{
              $t('page.emailVerify.message', {
                email: user.email,
              })
            }},
            <br />
            {{ $t('page.emailVerify.checkIt') }}.
          </p>
        </q-card-section>
        <q-card-section>
          <p>
            {{ $t('page.emailVerify.notReceivedYet') }}
            <q-btn flat color="primary" @click="resend">{{
              $t('page.emailVerify.resend')
            }}</q-btn>
          </p>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import useNotify from 'src/composables/UseNotify';
import useAuthService from 'src/services/auth.service';
import { useAuthStore } from 'src/stores/auth.store';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'RegisterPage',
  components: {},
  setup() {
    const service = useAuthService();
    const notify = useNotify();
    const { user } = useAuthStore();
    const { t } = useI18n();

    const resend = async () => {
      try {
        await service.resendVerification();
        notify.success(t('success'));
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
      user,
      resend,
    };
  },
});
</script>
