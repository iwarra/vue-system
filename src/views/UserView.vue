<script setup>
  import { useUserStore } from "../stores/user";
  const userStore = useUserStore();
  const username = userStore.getUsername;
</script>

<template>
  <div class="container">
    <h1>Welcome to your page!</h1>
    <hr>
    <p>Username: {{ username }}</p>
    <p>Member since: 05/08/2020 </p>
    <p>Membership status: Premium</p>
  </div>
</template>

<style scoped>
  p {
    font-size: 18px;
    margin: 10px 0;
  }
</style>