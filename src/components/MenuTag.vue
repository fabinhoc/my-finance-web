<template>
  <q-item>
    <q-item-section avatar class="col-2 column">
      <q-icon name="local_offer" :style="'color:' + color + '!important;'" />
    </q-item-section>
    <q-item-section class="col-7 column">
      <q-item-label>{{ name }}</q-item-label>
    </q-item-section>
    <q-item-section>
      <div class="col-1 column items-end">
        <q-btn flat round icon="more_vert" style="margin-top: -20px">
          <q-menu transition-show="scale" transition-hide="scale">
            <q-list style="min-width: 80px">
              <q-item clickable>
                <q-item-section avatar style="min-width: 30px">
                  <q-icon name="edit" size="xs" color="blue-6"></q-icon>
                </q-item-section>
                <q-item-section>
                  <span>Editar</span>
                </q-item-section>
              </q-item>
              <q-item clickable>
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
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MenuTag',
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
    color: {
      required: true,
      type: String,
      default: '',
    },
  },
});
</script>
