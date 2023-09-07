<script setup>
  import { useUserStore } from "../stores/user";
  const userStore = useUserStore();
  const username = userStore.getUsername;
</script>

<template>
  <div>
    <h1>Welcome to your page!</h1>
    <hr>
    <p>Username: {{ username }}</p>
    <p>Member since: 05/08/2020 </p>
    <p>Membership status: Premium</p>
  </div>
</template>

<style scoped></style>