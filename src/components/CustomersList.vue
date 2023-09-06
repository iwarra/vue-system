<script setup>
import { ref, computed, onMounted } from "vue";
import { fetchData } from "../controller/getData.js";
import { useCustomerStore } from "../stores/customer";

let items = ref([]);
let filter = ref('');

function navigateAndSendData(data) {
  const customerStore = useCustomerStore();
  customerStore.setCustomer(data);
};

const filteredItems = computed(() => {
  if (!filter.value) {
    // If the filter is empty, return all items
    return items.value; 
  }
  const lowerCaseFilter = filter.value.toLowerCase();
  return items.value.filter((item) => {
    const customerName = item.name.toLowerCase();
    return customerName.includes(lowerCaseFilter);
  })
});

onMounted(() => {fetchData('customer', items.value )});
</script>

<template>
<div class="customers-container">
  <div class="customer-header">
    <h1>Customers page</h1>
    <input
      v-model="filter"
      class="customers-filter"
      type="text"
      placeholder="Search..."
    />
  </div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Arr</th>
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredItems" :key="item.id" class="customer-row">
          <td class="table-name">
            <router-link
              :to="{
                name: 'SingleCustomerView',
                params: { id: item.id },
              }"
              @click="navigateAndSendData(item)"
            >
              {{ item.name }}
            </router-link>
          </td>
          <td class="table-arr">{{ item.arr }}</td>
          <td class="table-id">{{ item.id }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style  scoped>
 .customer-header {
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: space-between;
} 

th {
  text-align: start;
}

.table-name,
.table-arr {
  padding-right: 100px;
} 

.customers-filter {
  height: 24px;
  max-width: 200px;
  margin-bottom: 20px;
  padding-left: 5px;
}
</style>