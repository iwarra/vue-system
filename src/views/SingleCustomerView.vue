<script setup>
    import { useCustomerStore } from "../stores/customer";
     const customerStore = useCustomerStore();
     const customer = customerStore.getCustomer();
</script>

<template>
  <div>
    <h1>{{ customer.name }}page</h1>
    <hr />
    <p>Number of seats: {{ customer.seats }}</p>
    <p>Customer arr: {{ customer.arr }}</p>
  </div>
</template>


<style scoped></style>