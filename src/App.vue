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
#app {
  font-family: "Source Sans Pro";
}

.light-theme {
  min-height: 100vh;
  background-color: #ffffff;
  color: #333333;
  display: flex;
  flex-direction: column;
}
.dark-theme {
  min-height: 100vh;
  background-color: #333333;
  color: #ffffff;
  display: flex;
  flex-direction: column;

  .header-wrapper{
    box-shadow: rgba(225, 224, 224, 0.12) 0px 4px 10px;
  }
  
  .footer {
    box-shadow: rgba(235, 234, 234, 0.453) 0px 3px 10px;
  }

  .customer-table {
    .table-header {
      background-color: #212529;
    }
    .table-body tr {
    transition: background-color 150ms ease-out;
    background-color: #212529;
    }
    .table-body tr:nth-child(2n) {
      background-color:#2c3034;
    }
    .table-body tr td {
      color: rgb(231, 231, 231);
    }
    .table-name a {
      color: rgb(231, 231, 231);
    }
    .table-body tr:hover {
    background-color: #61a6aa;
    }
  };

  .customers-filter {
    background-color: #333333;
    color: #ffffff;
  }
}

.main {
  flex: 1;
}

h1 {
  font-weight: normal;
  font-size: 45px;
}
</style>
