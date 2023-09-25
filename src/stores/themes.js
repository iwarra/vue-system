import { defineStore } from "pinia";

export const useThemesStore = defineStore({
  id: 'theme',
  state: () => ({
    theme: localStorage.getItem('darkTheme') ? 'dark' : 'light',
  }),
  actions: {
    toggleTheme() {
      if (!localStorage.getItem('darkTheme')) {
        localStorage.setItem('darkTheme', true)
        this.theme = 'dark'
      } else {
        localStorage.removeItem('darkTheme')
        this.theme = 'light'
      }
    },
  },
  getters: {
    getTheme() {
      return this.theme;
    },
  }
})