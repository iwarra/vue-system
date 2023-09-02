<script setup>
import HeaderComponent from "./components/HeaderComponent.vue";
import HomePage from './components/HomePage.vue';
import LoginForm from "./components/LoginForm.vue";
import { onMounted } from 'vue';

import { useUserStore } from "./stores/user";
const userStore = useUserStore();

onMounted(() => {
  const user = localStorage.getItem("user");
  if (user) {
    autoLogin(JSON.parse(user));
  }
});
function autoLogin(user) {
  // If the user exists in local storage on create, update the user store info
  userStore.setLogIn(true);
  userStore.setCurrentUser(user.username);
};
</script>

<template>
   <HeaderComponent />
  <template v-if="!userStore.isLoggedIn">
    <LoginForm />
  </template>
  <template v-else>
    <HomePage />
  </template>
</template>

<style scoped>
#app {
  font-family: "IBM Plex Sans", sans-serif;
}
h1 {
  font-weight: normal;
}
</style>
