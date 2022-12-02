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
import { useYear } from 'src/stores/year.store';
import { watch, defineComponent, Ref, ref } from 'vue';

export default defineComponent({
  name: 'CarouselYear',
  setup() {
    const slide = ref(2022);
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;
    const nextYear = currentYear + 1;
    let slides: Ref<number[]> = ref([lastYear, currentYear, nextYear]);
    const { setYear } = useYear();

    watch(slide, (newValue) => {
      const currentYear = newValue;
      const lastYear = newValue - 1;
      const nextYear = newValue + 1;
      slides.value = [lastYear, currentYear, nextYear];
      setYear(currentYear);
    });

    return {
      slide,
      slides,
    };
  },
});
</script>
