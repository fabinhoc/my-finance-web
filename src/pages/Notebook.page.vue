<template>
  <q-page padding>
    <q-card bordered flat>
      <q-card-section>
        <NotebookPageCardTitle
          :title="'Caderno de contas'"
          :description="'Caderno de contas de casa'"
          :id="1"
        />
      </q-card-section>
      <q-separator class="q-mt-md" inset />
      <q-card-section>
        <CarouselYear />
      </q-card-section>
      <q-separator
        class="q-mt-md centered"
        size="2px"
        width="35%"
        style="margin: 0 auto"
      />
      <q-card-section>
        <CarouselMonth />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CarouselYear from 'src/components/CarouselYear.vue';
import CarouselMonth from 'src/components/CarouselMonth.vue';
import NotebookPageCardTitle from 'src/components/NotebookPageCardTitle.vue';

export default defineComponent({
  name: 'NotebookPage',
  components: {
    CarouselYear,
    CarouselMonth,
    NotebookPageCardTitle,
  },
  setup() {
    const slide = ref('style');
    return {
      slide,
    };
  },
});
</script>
