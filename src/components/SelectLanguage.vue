<template>
  <q-select
    v-model="locale"
    :options="localeOptions"
    dense
    borderless
    emit-value
    map-options
    options-dense
    dark
    @update:model-value="setLocale()"
  >
    <template v-slot:prepend>
      <q-icon name="translate" />
    </template>
  </q-select>
</template>

<script lang="ts">
import { api } from 'src/boot/axios';
import { useI18n } from 'vue-i18n';
import { Languages } from './models';
import { useQuasar } from 'quasar';
import enUS from 'quasar/lang/en-US';
import ptBR from 'quasar/lang/pt-BR';

export default {
  setup() {
    const { locale } = useI18n({ useScope: 'global' });
    const $q = useQuasar();

    const localeOptions: Array<Languages> = [
      { value: 'pt-BR', label: 'Portuguese' },
      { value: 'en-US', label: 'English' },
    ];

    const setLocale = () => {
      api.defaults.headers.common['X-Localization'] = locale.value;

      if (locale.value === 'en-US') {
        $q.lang.set(enUS);
        localStorage.setItem('user-lang', locale.value);
      }

      if (locale.value === 'pt-BR') {
        $q.lang.set(ptBR);
        localStorage.setItem('user-lang', locale.value);
      }
    };

    return {
      locale,
      localeOptions,
      setLocale,
    };
  },
};
</script>
