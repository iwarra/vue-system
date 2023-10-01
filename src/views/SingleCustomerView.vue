<script setup>
  const customer = JSON.parse(localStorage.getItem('customer'));
</script>

<template>
  <div class="container">
    <h1>{{ customer.name }}page</h1>
    <hr />
    <p>Number of seats: {{ customer.seats }}</p>
    <p>Customer arr: {{ customer.arr }}</p>
    <p>Created at: {{ customer.createdAt.slice(0,10) }}</p>
  </div>
</template>


<style scoped>
hr {
  margin-bottom: 20px;
}
p {
  font-size: 18px;
  margin: 10px 0;
}
</style>