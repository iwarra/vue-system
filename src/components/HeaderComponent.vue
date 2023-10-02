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
   <header class="header-wrapper">
    <div class="header-miniWrap">
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
    </div>
    <UserMenu
      class="dropdown-menu"
      @close="closeDropdown"
      v-if="showDropdown"
    />
  </header>
</template>

<style scoped>
.header-wrapper {
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 8px;
} 

.header-miniWrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 20px 12px 20px;
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
  color: var(--secondary-accent);
  font-weight: 700;
  font-size: 20px;
}

img {
  width: 50px;
  height: 50px;
}

.user-avatar {
  border-radius: 50%;
}
.user-name {
  font-weight: 600;
}
.user-title {
  color: #a9aebf;
}
.header-user {
  align-items: center;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
}
.nav-link {
  margin-right: 10px;
  font-size: 18px;
  text-decoration: none;
  color: #797d8b;
}
.active-link {
  font-weight: 600;
  color: var(--primary-accent);
  text-decoration: underline;
}

@media (max-width: 560px) {
  .user-avatar, .header-title {
    display: none;
  }
}
</style>