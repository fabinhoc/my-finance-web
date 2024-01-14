<template>
  <q-page class="row items-center justify-evenly" align="center">
    <div class="col-md-3 col-sm-6 col-xs-10">
      <q-card
        class="text-center"
        flat
        :square="false"
        style="background-color: transparent"
      >
        <q-card-section>
          <q-img
            src="/logo.png"
            class="q-mb-lg"
            style="max-width: 200px"
          ></q-img>
        </q-card-section>
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
            {{ $t('page.resetPasswordConfirmation.title') }}
          </p>
        </q-card-section>
        <q-card-section>
          <p class="">
            {{ $t('page.resetPasswordConfirmation.message') }}
          </p>
        </q-card-section>
        <q-card-section>
          <p class="">
            {{ $t('page.resetPasswordConfirmation.emailNotSent') }}
            <q-btn
              flat
              color="accent"
              @click="$router.push({ name: 'forgot-password' })"
              >{{ $t('page.resetPasswordConfirmation.resend') }}</q-btn
            >
          </p>
        </q-card-section>
        <q-card-section>
          <q-btn
            flat
            color="secondary"
            @click="$router.push({ name: 'login' })"
            >{{ $t('page.resetPasswordConfirmation.backToLogin') }}</q-btn
          >
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ResetPasswordConfirmationPage',
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
