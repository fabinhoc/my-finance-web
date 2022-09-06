<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-icon name="attach_money" />
          <span class="text-uppercase text-subtitle2">
            {{ $t('app.projectName') }}
          </span>
        </q-toolbar-title>

        <SelectLanguage />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SelectLanguage from 'src/components/SelectLanguage.vue';

export default defineComponent({
  name: 'LoginLayout',

  components: {
    SelectLanguage
  },

  setup () {
    return {
    }
  }
});
</script>
