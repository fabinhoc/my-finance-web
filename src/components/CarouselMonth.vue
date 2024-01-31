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
    height="50px"
  >
    <q-carousel-slide
      v-for="month in months"
      :key="month.monthInNumber"
      :name="month.monthInNumber"
      class="column no-wrap flex-center"
    >
      <div class="text-center text-h6 text-primary text-weight-light">
        {{ $t(month.stringMonth) }}
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { MonthType } from 'src/types/Month.type';
import { useMonth } from 'src/stores/month.store';
import { storeToRefs } from 'pinia';

const months = [
  {
    monthInNumber: '01',
    stringMonth: 'months.january',
  },
  {
    monthInNumber: '02',
    stringMonth: 'months.february',
  },
  {
    monthInNumber: '03',
    stringMonth: 'months.march',
  },
  {
    monthInNumber: '04',
    stringMonth: 'months.april',
  },
  {
    monthInNumber: '05',
    stringMonth: 'months.may',
  },
  {
    monthInNumber: '06',
    stringMonth: 'months.june',
  },
  {
    monthInNumber: '07',
    stringMonth: 'months.july',
  },
  {
    monthInNumber: '08',
    stringMonth: 'months.august',
  },
  {
    monthInNumber: '09',
    stringMonth: 'months.september',
  },
  {
    monthInNumber: '10',
    stringMonth: 'months.october',
  },
  {
    monthInNumber: '11',
    stringMonth: 'months.november',
  },
  {
    monthInNumber: '12',
    stringMonth: 'months.december',
  },
] as MonthType[];

export default defineComponent({
  name: 'CarouselMonth',
  setup() {
    const addLeadingZeroMonth = (month: number) => {
      return month <= 9 ? '0' + month : month.toString();
    };
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const formattedMonth = addLeadingZeroMonth(currentMonth);
    const slide = ref(formattedMonth);
    const { setMonth } = useMonth();
    const { month } = storeToRefs(useMonth());

    onMounted(() => {
      setMonthToStoreValue(slide.value);
    });

    watch(
      [slide, month],
      async ([newValue, newMonth], [oldValue, oldMonth]) => {
        if (newMonth.monthInNumber !== oldMonth.monthInNumber) {
          slide.value = newMonth.monthInNumber;
        }
        if (newValue !== oldValue) {
          slide.value = newValue;
        }
        setMonthToStoreValue(newValue);
      }
    );

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
