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
    <main class="main">
      <LoginForm v-if="!userStore.isLoggedIn"/>
      <HomePage v-else/>
    </main>
    <FooterComponent/>
  </div>
</template>

<style>
.light-theme {
  min-height: 100vh;
  background-color: var(--primary-light);
  color: var(--font-dark);
  display: flex;
  flex-direction: column;
  transition: var(--theme-transition);
}
.dark-theme {
  min-height: 100vh;
  background-color: var(--primary-dark);
  color: var(--primary-light);
  display: flex;
  flex-direction: column;
  transition: var(--theme-transition);

  .header-wrapper{
    box-shadow: rgba(225, 224, 224, 0.12) 0px 4px 10px;
  }
  
  .footer {
    box-shadow: rgba(235, 234, 234, 0.453) 0px 3px 10px;
  }

  .customer-table {
    .table-header {
      background-color: #00000075;
    }
    .table-body .customer-row {
      transition: background-color 250ms ease-out;
      background-color: #1d1d1d;
    }
    .table-body tr:nth-child(2n) {
      background-color:#2d2d2d;
    }
    .table-body tr td {
      color: #E7E7E7;
    }
    .table-name a {
      color: #E7E7E7;
    }
    .table-body tr:hover {
      font-weight: 600;
    }
  };

  input,button {
    background-color: var(--primary-dark);
    color: var(--primary-light);
  }
}

.main {
  flex: 1;
}
</style>
