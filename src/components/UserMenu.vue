<script setup>
import { useThemesStore } from "../stores/themes";
import { useUserStore } from "../stores/user";
const emit = defineEmits(['close']);
const themesStore = useThemesStore();

  const userStore = useUserStore();
  const username = userStore.getUsername; 

  function handleLogOut() {
    userStore.resetUsername();
    userStore.setLogIn(false);
    //close the menu on log out
    localStorage.removeItem("user");
    emit("close");
  };
</script>

<template>
  <div :class="[themesStore.theme === 'light' ? 'wrapper' : 'dark']">
    <ul class="dropdown-nav">
      <li class="dropdown-item">
        <router-link 
          :to="{
                name: 'UserView',
                params: { username },
              }"
          @click="emit('close')"
          class="dropdown-link active"
          title="User page"
        >
        <mdicon 
            name="card-account-details-outline"
            size="18" />
          <div class="dropdown-text">Account</div>
        </router-link>
      </li>
      <li class="dropdown-item">
        <a class="dropdown-link" title="Data personalization (incoming)">
          <mdicon 
            name="database-edit-outline"
            size="20" />
          <div class="dropdown-text">Data personalization</div>
        </a>
      </li>
      <li class="dropdown-item">
        <router-link
          to="/"
          class="dropdown-link active"
          @click="handleLogOut()"
          title="Log out"
        >
         <mdicon 
            name="logout-variant"
            size="20" />
          <div class="dropdown-text">Log out</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style  scoped>
.dark {
  background-color: #333333;;
  color: white;
  border: 1px solid rgb(120, 120, 120);
}
.wrapper {
   position: relative; 
   z-index: 1;
   background-color: white;
   border: 1px solid #ccc;
}

ul {
  list-style: none;
}
a {
  text-decoration: none;
}
.dropdown-link {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
  color: #5b6791b2;
  padding: .5rem 1.5rem .8rem 1.5rem;
  cursor: not-allowed;
  pointer-events: none;
}
.active {
  color: rgb(4, 188, 220);
  cursor: pointer;
  pointer-events: auto;
}
.dropdown-nav {
  padding: 0;
}
</style>