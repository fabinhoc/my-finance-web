import { defineStore } from 'pinia';

export const useYear = defineStore('year', {
  state: () => ({
    year: {} as number,
  }),
  actions: {
    setYear(year: number) {
      this.year = year;
    },
  },
});
