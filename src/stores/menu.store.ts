import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menuNotebookData: false,
  }),
  actions: {
    setUpdateMenuNotebook(value: boolean) {
      this.menuNotebookData = value;
    },
  },
});
