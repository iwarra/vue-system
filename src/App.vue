<script setup>
import HeaderComponent from "./components/HeaderComponent.vue";
import HomePage from "./components/HomePage.vue";
import LoginForm from "./components/LoginForm.vue";
import FooterComponent from "./components/FooterComponent.vue";
import { onMounted } from "vue";
import { useUserStore } from "./stores/user";
import { useThemesStore } from "./stores/themes";
const themesStore = useThemesStore();
const userStore = useUserStore();

function autoLogin(user) {
  // If the user exists in local storage on create, update the user store info
  userStore.setLogIn(true);
  userStore.setCurrentUser(user.username);
};

onMounted(() => {
  const user = localStorage.getItem("user");
  if (user) {
    autoLogin(JSON.parse(user));
  }
});
</script>

<template >
  <div :class="[themesStore.theme === 'light' ? 'light-theme' : 'dark-theme']">
    <HeaderComponent />
    <LoginForm v-if="!userStore.isLoggedIn"/>
    <HomePage v-else/>
    <FooterComponent/>
  </div>
</template>

<style>
#app {
  font-family: "Source Sans Pro";
}
.light-theme {
  background-color: #ffffff;
  color: #333333;
}
.dark-theme {
  background-color: #333333;
  color: #ffffff;
}
h1 {
  font-weight: normal;
  font-size: 45px;
}
</style>
