<template>
  <div class="row">
    <div class="col">
      <span class="text-h6">{{ title }}</span>
      <div>
        <span class="text-subtitle2 text-weight-light">{{ description }}</span>
      </div>
    </div>
    <q-space />
    <div class="col-1 column items-end">
      <q-btn flat round icon="more_vert">
        <q-menu transition-show="scale" transition-hide="scale">
          <q-list style="min-width: 80px">
            <q-item clickable @click="$emit('editNotebook')">
              <q-item-section avatar style="min-width: 30px">
                <q-icon name="edit" size="xs" color="blue-6"></q-icon>
              </q-item-section>
              <q-item-section>
                <span>Editar</span>
              </q-item-section>
            </q-item>
            <q-item clickable @click="$emit('removeNotebook')">
              <q-item-section avatar style="min-width: 30px">
                <q-icon name="delete" size="xs" color="negative"></q-icon>
              </q-item-section>
              <q-item-section>
                <span>Excluir</span>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotebookPageCardTitle',
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
    id: {
      required: true,
      type: Number,
    },
  },
});
</script>
