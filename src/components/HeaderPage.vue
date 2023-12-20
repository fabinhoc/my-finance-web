<template>
  <div class="row">
    <div class="col">
      <span class="text-h6">{{ title }}</span>
      <div>
        <span class="text-subtitle2 text-weight-light">{{ description }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderPage',
  props: {
    title: {
      required: true,
      default: '',
      type: String,
    },
    description: {
      required: true,
      default: '',
      type: String,
    },
  },
});
</script>
