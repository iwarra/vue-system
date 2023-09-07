import { defineStore } from "pinia";

export const useThemesStore = defineStore({
  id: "theme",
  state: () => ({
    theme: "light",
  }),
  actions: {
    toggleTheme() {
      console.log("Toggling theme...");
      this.theme = this.theme === 'light' ? 'dark' : 'light';
    },
  }
})