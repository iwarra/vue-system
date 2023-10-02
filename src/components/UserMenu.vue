<script setup>
import { onUnmounted, onMounted } from 'vue';
import { useThemesStore } from "../stores/themes";
import { useUserStore } from "../stores/user";
const emit = defineEmits(['close']);
const themeStore = useThemesStore();

const userStore = useUserStore();
const username = userStore.getUsername; 

function handleLogOut() {
  userStore.resetUsername();
  userStore.setLogIn(false);
  //close the menu on log out
  localStorage.removeItem("user");
  emit("close");
};

function handleClosingEvent(e) {
  const parentSpan = e.target.closest('span');
  const parentLi = e.target.closest('li');

  if (parentSpan !== null && parentSpan.classList.contains('svg-icon')) {
    return;
  }

  if (parentLi !== null && parentLi.classList.contains('dropdown-item')) {
    return;
  }

  emit("close");
};
  
onMounted(() => {
  document.addEventListener('click', handleClosingEvent)
}) 

onUnmounted(() => {
  document.removeEventListener('click', handleClosingEvent)
}) 
</script>

<template>
  <div :class="[themeStore.getTheme === 'light' ? 'wrapper' : 'dark']">
    <ul class="dropdown-nav">
      <li class="dropdown-item">
        <span class="dropdown-link active" @click="themeStore.toggleTheme">
          <mdicon 
              :name="themeStore.getTheme === 'light'? 'toggle-switch-off-outline' : 'toggle-switch-outline'"
              size="18" 
          />
          <span>Toggle Theme</span>
        </span>
      </li>
      <li class="dropdown-item">
        <router-link 
          :to="{
                name: 'UserView',
                params: { username },
              }"
          class="dropdown-link active"
          title="User page"
        >
        <mdicon 
            name="card-account-details-outline"
            size="18" />
          <span class="dropdown-text">Account</span>
        </router-link>
      </li>
      <li class="dropdown-item">
        <a class="dropdown-link" title="Data personalization (incoming)">
          <mdicon 
            name="database-edit-outline"
            size="20" />
          <span class="dropdown-text">Data personalization</span>
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
          <span class="dropdown-text">Log out</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style  scoped>
.dark {
  background-color: var(--primary-dark);;
  color: var(--primary-light);
  transition: background-color var(--theme-transition);
  z-index: 1;
  box-shadow: rgba(0, 0, 0, 0.48) 0px 10px 20px, rgba(0, 0, 0, 0.23) -10px 6px 20px ;
  border-top: .5px solid var(--border-dark);
}
.wrapper {
  z-index: 1;
  background-color: var(--primary-light);
  transition: background-color var(--theme-transition);
  border-top: 1px solid var(--border-light);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
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
  color: var(--primary-accent);
  cursor: pointer;
  pointer-events: auto;
}
.dropdown-nav {
  padding: 10px;
}
</style>