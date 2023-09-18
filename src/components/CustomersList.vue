<script setup>
import { ref, computed, onMounted } from "vue";
import { fetchData } from "../controller/getData.js";
import { useCustomerStore } from "../stores/customer";
import LoadingSpinner from './LoadingSpinner.vue';
import { useLoadingStore } from "../stores/loading";

const loadingStore = useLoadingStore();
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

function sortCustomers(columnNr) {
  console.log(table.tBodies[0].rows)
  let sortedRows = Array.from(table.tBodies[0].rows) 
    .sort((rowA, rowB) => 
      rowA.cells[columnNr].innerText.localeCompare(rowB.cells[columnNr].innerText)
    );

  table.tBodies[0].append(...sortedRows);
}

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
  <LoadingSpinner v-if="loadingStore.isLoading" />
    <table id="table" v-else>
      <thead>
        <tr>
          <th>Name
            <mdicon 
              @click="sortCustomers(0)"
              class="arrow-icon"
              name="arrow-down"
              size="18" 
            />
          </th>
          <th>Arr
            <mdicon 
              @click="sortCustomers(1)"
              class="arrow-icon"
              name="arrow-down"
              size="18" 
            />
          </th>
          <th>ID
            <mdicon 
              @click="sortCustomers(2)"
              class="arrow-icon"
              name="arrow-down"
              size="18" 
            />
          </th>
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
table {
  font-family: Source Sans Pro;
	width:100%;
  border-collapse: collapse; 
}

.customer-header input {
  margin-bottom: 44px;
}

tbody {
  font-size: 18px;
}

table tr td {
  border: none;
  border-left: 0;
  border-right: 0;
  white-space: nowrap;
  color: grey;
}

th {
  color: #67d5e8;
  padding: 10px;
  font-size: 21px;
  font-weight: 600;
  background-color: #5d5d5d;
  border-bottom: solid 2px #d8d8d8;
  position: sticky;
  top: 0;
}

td {
  padding: 4px 0px 4px 10px;
}

.table-name a {
  text-decoration: none;
  color: grey;
}

tbody tr {
  transition: background-color 150ms ease-out;
  background-color: #f8f6f6;
}
tbody tr:nth-child(2n) {
  background-color:#dcdbdb;
}
tbody tr:hover {
  background-color: #cac9c9;
}

 .customer-header {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
} 

th {
  text-align: start;
}

.customers-filter {
  height: 26px;
  min-width: 200px;
  padding-left: 5px;
}
</style>