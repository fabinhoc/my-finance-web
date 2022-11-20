<template>
  <q-item
    clickable
    :to="'notebooks/' + id + '/' + name.replaceAll(' ', '-').toLowerCase()"
  >
    <q-item-section avatar>
      <q-icon name="mdi-notebook-multiple" color="grey-7" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ name }}</q-item-label>
      <q-item-label caption>{{ description }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MenuNotebook',
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
      default: '',
    },
    description: {
      required: false,
      type: String,
      default: '',
    },
  },
});
</script>
