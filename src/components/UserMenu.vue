<script setup>
  import { useUserStore } from "../stores/user";
  const emit = defineEmits(['close']);

  const userStore = useUserStore();
  function handleLogOut() {
    userStore.resetUsername();
    userStore.setLogIn(false);
    //close the menu on log out
    localStorage.removeItem("user");
    emit("close");
  };
</script>

<template>
  <div class="wrapper">
    <ul class="dropdown-nav">
      <li class="dropdown-item">
        <a class="dropdown-link" title="Account (incoming)">
          <div class="dropdown-svg">
            <svg viewBox="0 0 496 512">
              <path
                fill="currentColor"
                d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm128 421.6c-35.9 26.5-80.1 42.4-128 42.4s-92.1-15.9-128-42.4V416c0-35.3 28.7-64 64-64 11.1 0 27.5 11.4 64 11.4 36.6 0 52.8-11.4 64-11.4 35.3 0 64 28.7 64 64v13.6zm30.6-27.5c-6.8-46.4-46.3-82.1-94.6-82.1-20.5 0-30.4 11.4-64 11.4S204.6 320 184 320c-48.3 0-87.8 35.7-94.6 82.1C53.9 363.6 32 312.4 32 256c0-119.1 96.9-216 216-216s216 96.9 216 216c0 56.4-21.9 107.6-57.4 146.1zM248 120c-48.6 0-88 39.4-88 88s39.4 88 88 88 88-39.4 88-88-39.4-88-88-88zm0 144c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56z"
              />
            </svg>
          </div>
          <div class="dropdown-text">Account</div>
        </a>
      </li>
      <li class="dropdown-item">
        <a class="dropdown-link" title="Data personalization (incoming)">
          <div class="dropdown-svg">
            <svg viewBox="0 0 496 512">
              <path
                fill="currentColor"
                opacity="0.4"
                d="M447 73.14v45.72C447 159.14 346.67 192 223 192S-1 159.14-1 118.86V73.14C-1 32.86 99.33 0 223 0s224 32.86 224 73.14z"
              />
              <path
                fill="currentColor"
                d="M-1 336v102.86C-1 479.14 99.33 512 223 512s224-32.86 224-73.14V336c-48.13 33.14-136.21 48.57-224 48.57S47.12 369.14-1 336zm224-111.43c-87.79 0-175.88-15.43-224-48.57v102.86C-1 319.14 99.33 352 223 352s224-32.86 224-73.14V176c-48.13 33.14-136.21 48.57-224 48.57z"
              />
            </svg>
          </div>
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
          <div class="dropdown-svg">
            <svg viewBox="0 0 640 512">
              <path
                fill="currentColor"
                d="M480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm0-160c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zM192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm0-192c44.1 0 80 35.9 80 80s-35.9 80-80 80-80-35.9-80-80 35.9-80 80-80zm80.1 212c-33.4 0-41.7 12-80.1 12-38.4 0-46.7-12-80.1-12-36.3 0-71.6 16.2-92.3 46.9C7.2 341.3 0 363.4 0 387.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-44.8c0-23.8-7.2-45.9-19.6-64.3-20.7-30.7-56-46.9-92.3-46.9zM352 432c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16v-44.8c0-16.6 4.9-32.7 14.1-46.4 13.8-20.5 38.4-32.8 65.7-32.8 27.4 0 37.2 12 80.2 12s52.8-12 80.1-12c27.3 0 51.9 12.3 65.7 32.8 9.2 13.7 14.1 29.8 14.1 46.4V432zm271.7-114.9C606.4 291.5 577 278 546.8 278c-27.8 0-34.8 10-66.8 10s-39-10-66.8-10c-13.2 0-26.1 3-38.1 8.1 15.2 15.4 18.5 23.6 20.2 26.6 5.7-1.6 11.6-2.6 17.9-2.6 21.8 0 30 10 66.8 10s45-10 66.8-10c21 0 39.8 9.3 50.4 25 7.1 10.5 10.9 22.9 10.9 35.7V408c0 4.4-3.6 8-8 8H416c0 17.7.3 22.5-1.6 32H600c22.1 0 40-17.9 40-40v-37.3c0-19.9-6-38.3-16.3-53.6z"
              />
            </svg>
          </div>
          <div class="dropdown-text">Log out</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>


<style  scoped>
ul {
  list-style: none;
}
a {
  text-decoration: none;
}
.dropdown-svg {
  width: 1.5rem;
  height: 1.5rem;
}
.dropdown-link {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
  color: #5b6791b2;
  padding: 1rem 1.5rem 0 1.5rem;
  cursor: not-allowed;
  pointer-events: none;
}
.active {
  color: #2050fe;
  cursor: pointer;
  pointer-events: auto;
}
.dropdown-nav {
  padding: 0;
}
</style>