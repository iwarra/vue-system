import { defineStore } from "pinia";

let userCheck = localStorage.getItem('user');
let storedUser = JSON.parse(userCheck);

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    username: userCheck ? storedUser.username : '',
    isLoggedIn: false
  }),
  actions: {
    toggleLog() {
      this.isLoggedIn = !this.isLoggedIn;
    },
    resetLogIn() {
      this.isLoggedIn = false;
    },
    setLogIn(value) {
      this.isLoggedIn = value;
    },
    setCurrentUser(name) {
      this.username = name;
    },
    resetUsername() {
      this.username = "";
    }
  },
  getters: {
    getUsername() {
      return this.username;
    },
    getLogInStatus() {
      return this.isLoggedIn;
    }
  }
});