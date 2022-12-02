<template>
  <q-carousel
    v-model="slide"
    transition-prev="slide-right"
    transition-next="slide-left"
    animated
    control-color="dark"
    class="rounded-borders"
    padding
    arrows
    infinite
    height="90px"
  >
    <q-carousel-slide
      v-for="month in months"
      :key="month.monthInNumber"
      :name="month.monthInNumber"
      class="column no-wrap flex-center"
    >
      <div class="text-center text-h6 text-primary text-weight-light">
        {{ month.stringMonth }}
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { MonthType } from 'src/types/Month.type';
import { useMonth } from 'src/stores/month.store';

const months = [
  {
    monthInNumber: '01',
    stringMonth: 'Janeiro',
  },
  {
    monthInNumber: '02',
    stringMonth: 'Fevereiro',
  },
  {
    monthInNumber: '03',
    stringMonth: 'Março',
  },
  {
    monthInNumber: '04',
    stringMonth: 'Abril',
  },
  {
    monthInNumber: '05',
    stringMonth: 'Maio',
  },
  {
    monthInNumber: '06',
    stringMonth: 'Junho',
  },
  {
    monthInNumber: '07',
    stringMonth: 'Julho',
  },
  {
    monthInNumber: '08',
    stringMonth: 'Agosto',
  },
  {
    monthInNumber: '09',
    stringMonth: 'Setembro',
  },
  {
    monthInNumber: '10',
    stringMonth: 'Outubro',
  },
  {
    monthInNumber: '11',
    stringMonth: 'Novembro',
  },
  {
    monthInNumber: '12',
    stringMonth: 'Dezembro',
  },
] as MonthType[];

export default defineComponent({
  name: 'CarouselMonth',
  setup() {
    const slide = ref('11');
    const { setMonth } = useMonth();

    onMounted(() => {
      setMonthToStoreValue(slide.value);
    });

    watch(slide, (newValue) => {
      setMonthToStoreValue(newValue);
    });

    const setMonthToStoreValue = (monthValueInNumber: string) => {
      const selectedMonth = months.find(
        (month) => month.monthInNumber === monthValueInNumber
      );
      setMonth(selectedMonth as MonthType);
    };

    return {
      slide,
      months,
    };
  },
});
</script>
