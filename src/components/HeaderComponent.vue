<script setup>
import UserMenu from './UserMenu.vue';
import { useUserStore } from "../stores/user";
import logo2 from '../assets/logo2.png';
import userAvatar from '../assets/user-avatar.png';
import { ref } from 'vue';

const logoLink = logo2;
const userAvatarLink = userAvatar;
let showDropdown = ref(false);
const userStore = useUserStore();

function closeDropdown() {
  showDropdown.value = false;
}

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
};
</script>

<template>
   <div class="wrapper">
    <header class="header">
      <div :class="[userStore.username.length > 0 ? 'header-info' : 'header-info--loggedOut']">
        <img class="header-logo" :src="logoLink" alt="Company logo" />
        <p class="header-title">VUE APP</p>
        <nav v-if="userStore.isLoggedIn" class="header-nav">
          <router-link to="/" exact class="nav-link" active-class="active-link"
            >Home</router-link
          >
          <router-link
            to="/customers"
            class="nav-link"
            active-class="active-link"
            >Customers</router-link
          >
        </nav>
      </div>
      <div v-if="userStore.isLoggedIn" class="header-user">
        <img
          class="user-avatar"
          :src="userAvatarLink"
          alt="user avatar"
        />
        <div class="user-info">
          <p class="user-name">{{ userStore.username }}</p>
          <p class="user-title">Guest</p>
        </div>
        <div>
          <mdicon 
            v-if="!showDropdown"
            @click="toggleDropdown"
            name="triangle-down-outline"
            class="svg-icon"
            size="15" />
          <mdicon 
            v-if="showDropdown"
            @click="toggleDropdown"
            name="triangle-outline"
            size="15" />
        </div>
      </div>
    </header>
    <hr />
    <UserMenu 
      class="dropdown-menu"
      @close="closeDropdown"
      v-if="showDropdown"
      />
  </div>
</template>

<style scoped>
p {
  margin: 0;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 20px 8px 20px;
}
.header-info,
.header-user {
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 15px;
}
.header-info {
  flex-wrap: wrap;
}

.header-info--loggedOut {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 15px;
  justify-content: space-between;
}
.header-title {
  color: #f5bf12;
  font-weight: 700;
  font-size: 20px;
}
img {
  width: 50px;
  height: 50px;
}

button {
  padding: 3px 6px;
  background-color: #eee;
  border: 1px solid #02b0cd;
  border-radius: 5px;
}

.user-avatar {
  border-radius: 50%;
}
.user-name {
  font-weight: 600;
}
.user-title,
hr {
  color: #a9aebf;
}
.header-user {
  align-items: center;
}
.wrapper {
  position: relative;
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}
.nav-link {
  margin-right: 8px;
  font-size: 18px;
  text-decoration: none;
  color: #797d8b;
}
.active-link {
  font-weight: 600;
  color: #02b0cd;
  text-decoration: underline;
}
@media (max-width: 560px) {
  .user-avatar {
    display: none;
  }
}
</style>