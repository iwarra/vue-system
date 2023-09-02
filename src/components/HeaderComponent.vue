<script setup>
import UserMenu from './UserMenu.vue';
import { useUserStore } from "../stores/user";
import logo from '../assets/logo.png';
import userAvatar from '../assets/user-avatar.png';
import { ref } from 'vue';

const logoLink = logo;
const userAvatarLink = userAvatar;
let showDropdown = ref(true);
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
      <div class="header-info">
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
          <span @click="toggleDropdown" v-if="!showDropdown">
            &#9660;
          </span>
          <span
            class="close-btn"
            v-if="showDropdown"
            @click="toggleDropdown"
          >
            x
          </span>
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
  margin-inline: 10px;
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
.header-title {
  color: #1c2c54;
  font-family: Lato;
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
.user-title,
hr {
  color: #a4aabd;
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
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.nav-link {
  margin-right: 8px;
  text-decoration: none;
  color: #797d8b;
}
.active-link {
  font-weight: 600;
  color: #2050fe;
  text-decoration: underline;
}
.close-btn {
  font-weight: 600;
  font-size: 1.2em;
  width: 15px;
}
@media (max-width: 560px) {
  .user-avatar {
    display: none;
  }
}
</style>