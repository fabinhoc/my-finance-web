<template>
  <q-page class="row items-center justify-evenly" align="center">
    <div class="col-md-4 col-sm-6 col-xs-10">
      <q-card
        class="text-center"
        flat
        :square="false"
        style="background-color: transparent"
      >
        <q-img
          src="/src/assets/logo-tanotado.png"
          class="q-mb-lg"
          style="max-width: 200px"
        ></q-img>
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
            {{ response }}
          </p>
        </q-card-section>
        <q-card-section>
          <p>
            <q-btn
              flat
              color="primary"
              @click="$router.push({ name: 'login' })"
            >
              {{ $t('page.verify.backToLogin') }}
            </q-btn>
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
import { defineComponent, onMounted, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'VerifyPage',
  components: {},
  setup() {
    const service = useAuthService();
    const notify = useNotify();
    const route = useRoute();
    const { user, setUser } = useAuthStore();
    const response: Ref<string> = ref('');

    onMounted(() => {
      verifyEmail();
    });

    const verifyEmail = async () => {
      try {
        const url = `${route.query.url}&signature=${route.query.signature}`;
        const { data } = await service.verifyEmail(url);
        response.value = data.message;
        setUser();
      } catch (error: any) {
        console.log(error);
        const message = error?.response?.message ?? error.message;
        notify.error(message);
        response.value = message;
      }
    };

    return {
      user,
      response,
    };
  },
});
</script>

<style scoped></style>
