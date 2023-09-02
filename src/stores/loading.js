import { defineStore } from "pinia";

export const useLoadingStore = defineStore({
  id: "loading",
  state: () => ({
    isLoading: true
  }),
  actions: {
    setLoading(isLoading) {
      this.isLoading = isLoading;
    }
  }
});
