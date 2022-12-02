<template>
  <q-carousel
    v-model="slide"
    transition-prev="slide-right"
    transition-next="slide-left"
    animated
    control-color="dark"
    class="rounded-borders"
    arrows
    infinite
    height="58px"
  >
    <q-carousel-slide
      v-for="slide in slides"
      :key="slide"
      :name="slide"
      class="column no-wrap flex-center"
    >
      <div class="text-center text-h3 text-primary text-weight-regular">
        {{ slide }}
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script lang="ts">
import { watch, defineComponent, Ref, ref } from 'vue';

export default defineComponent({
  name: 'CarouselYear',
  setup() {
    const slide = ref(2022);
    const year = new Date().getFullYear();
    let slides: Ref<number[]> = ref([year - 1, year, year + 1]);
    watch(slide, (newValue) => {
      slides.value = [newValue - 1, newValue, newValue + 1];
    });

    return {
      slide,
      slides,
    };
  },
});
</script>
