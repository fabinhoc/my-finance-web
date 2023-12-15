import { defineStore } from 'pinia';

export const useTagStore = defineStore('tag', {
  state: () => ({
    isRemovedTag: false,
  }),
  actions: {
    setIsRemovedTag(value: boolean) {
      this.isRemovedTag = value;
    },
  },
});
