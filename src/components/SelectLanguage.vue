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

export default {
  setup() {
    const { locale } = useI18n({ useScope: 'global' });

    const localeOptions: Array<Languages> = [
      { value: 'pt-BR', label: 'Portuguese' },
      { value: 'en-US', label: 'English' },
    ];

    const setLocale = () => {
      api.defaults.headers.common['Accept-Language'] = locale.value;
    };

    return {
      locale,
      localeOptions,
      setLocale,
    };
  },
};
</script>
