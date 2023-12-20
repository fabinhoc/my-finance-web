<template>
  <q-page padding>
    <q-card
      bordered
      flat
      class="text-center row items-center justify-evenly"
      full-height
    >
      <q-card-section>
        <div class="col-md-12 col-sm-12 col-xs-12">
          <p class="text-h4 text-primary">
            Bem-vindo ao aplicativo {{ $t('app.projectName') }}
          </p>
        </div>
        <div class="col-md-12 col-sm-12 col-xs-12">
          <p class="text-h6 text-grey-8">
            Comece criando seu primeiro caderno de contas
          </p>
        </div>
        <div class="col-md-12 col-sm-12 col-xs-12">
          <q-btn color="primary" @click="toggleDialog = true">
            Adicionar caderno de contas</q-btn
          >
        </div>
      </q-card-section>
    </q-card>

    <q-dialog
      v-model="toggleDialog"
      persistent
      :maximized="$q.platform.is.mobile"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <FormNotebook @toggle-dialog="closeDialog" />
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import FormNotebook from 'src/components/FormNotebook.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'IndexPage',
  components: {
    FormNotebook,
  },
  setup() {
    const toggleDialog = ref(false);
    const router = useRouter();

    const closeDialog = (response: any) => {
      toggleDialog.value = false;
      router.push({
        name: 'notebooks',
        params: { id: response.notebook.id, name: response.notebook.name },
      });
    };

    return {
      toggleDialog,
      closeDialog,
    };
  },
});
</script>
