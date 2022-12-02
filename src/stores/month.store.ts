import { defineStore } from 'pinia';
import { MonthType } from 'src/types/Month.type';

export const useMonth = defineStore('month', {
  state: () => ({
    month: {} as MonthType,
  }),
  actions: {
    setMonth(month: MonthType) {
      this.month = month;
    },
  },
});
