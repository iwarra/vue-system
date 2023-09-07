<script setup>
    import { useCustomerStore } from "../stores/customer";
     const customerStore = useCustomerStore();
     const customer = customerStore.getCustomer();
</script>

<template>
  <div class="container">
    <h1>{{ customer.name }}page</h1>
    <hr />
    <p>Number of seats: {{ customer.seats }}</p>
    <p>Customer arr: {{ customer.arr }}</p>
  </div>
</template>


<style scoped>
.container {
  height: 100vh;
}
hr {
  margin-bottom: 20px;
}
p {
  font-size: 18px;
  margin: 10px 0 10px 0;
}
</style>