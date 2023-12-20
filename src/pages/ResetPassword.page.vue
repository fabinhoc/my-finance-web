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
            src="/src/assets/logo.png"
            class="q-mb-lg"
            style="max-width: 200px"
          ></q-img>
        </q-card-section>
        <q-card-section>
          <p class="text-h5 text-weight-medium">
            {{ $t('page.resetPassword.title') }}
          </p>
        </q-card-section>
        <q-card-section>
          <p class="">
            {{ $t('page.resetPassword.message') }}
          </p>
        </q-card-section>
        <q-card-section>
          <FormResetPassword />
        </q-card-section>
        <q-card-section>
          <p class="">
            {{ $t('page.resetPassword.remember') }}
            <q-btn
              flat
              color="accent"
              @click="$router.push({ name: 'login' })"
              >{{ $t('page.resetPassword.signin') }}</q-btn
            >
          </p>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import FormResetPassword from 'src/components/FormResetPassword.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ResetPasswordPage',
  components: {
    FormResetPassword,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
