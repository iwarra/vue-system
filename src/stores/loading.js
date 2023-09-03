import { defineStore } from "pinia";

export const useLoadingStore = defineStore({
  id: "loading",
  state: () => ({
    isLoading: false
  }),
  actions: {
    setLoading(isLoading) {
      this.isLoading = isLoading;
    }
  }
});
