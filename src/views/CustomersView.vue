<script setup>
import { ref, computed, onMounted } from "vue";
import { fetchData } from "../controller/getData.js";
import LoadingSpinner from '../components/LoadingSpinner.vue';
import { useLoadingStore } from "../stores/loading";

const loadingStore = useLoadingStore();
let items = ref([]);
let filter = ref('');
let pageNumber = ref(1)
let sortingDirections = ref(new Array(3).fill(null));

function processAndAddData(data) {
  localStorage.removeItem('customer')
  let customerObj = {
    name: data.name,
    arr: data.arr,
    seats: data.seats,
    createdAt: data.createdAt
  }
  localStorage.setItem('customer', JSON.stringify(customerObj))
};

const filteredItems = computed(() => {
  if (!filter.value) {
    // If the filter is empty, return all items for that page
    return splittingTheArray(pageNumber.value)
  }
  const lowerCaseFilter = filter.value.toLowerCase();
  return items.value.filter((item) => {
    const customerName = item.name.toLowerCase();
    return customerName.includes(lowerCaseFilter);
  })
});

function sortCustomers(columnNr) {
  sortingDirections.value[columnNr] = !sortingDirections.value[columnNr];
  let ascending = sortingDirections.value[columnNr]

  let sortedRows = Array.from(table.tBodies[0].rows) 
    .sort((rowA, rowB) => {
      const cellA = rowA.cells[columnNr].innerText;
      const cellB = rowB.cells[columnNr].innerText;

      const numA = parseFloat(cellA);
      const numB = parseFloat(cellB);

      if (!isNaN(numA) && !isNaN(numB)) {
        return ascending ? numA - numB : numB - numA;
      } else {
        return ascending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
      }
    });

  table.tBodies[0].append(...sortedRows);
}

function paginationCount() {
  let max = Math.ceil(items.value.length / 10);
  return Array.from({ length: max }, (_, i) => i + 1);
}
const pagesArray = computed(() => paginationCount())

const newSplitArray = computed(() => {
  const numPages = Math.ceil(items.value.length / 10);
  return Array.from({ length: numPages }, (_, i) => {
    const startIndex = i * 10;
    const endIndex = startIndex + 10;
    return items.value.slice(startIndex, endIndex);
  });
});

function getIconClass(element, condition) {
  if (element === 'icon') {
    return condition ? 'pgn-icon--disabled' : 'pgn-icon';
  }
  if (element === 'item') {
    return condition ? 'pagination-item active' : 'pagination-item'
  }
}

function splittingTheArray(page) {
  pageNumber.value = page;
  return (newSplitArray.value[page - 1])
}

onMounted(async () => { 
  await fetchData('customer', items.value )
  splittingTheArray(pageNumber.value)
});
</script>

<template>
  <div class="container">
    <div class="customers-header">
      <h1>Customers page</h1>
      <input
        v-model="filter"
        class="customers-filter"
        type="text"
        placeholder="Search..."
      />
    </div>
  <LoadingSpinner v-if="loadingStore.isLoading" />
    <table id="table" v-else class="customer-table">
      <thead class="table-header">
        <tr>
          <th @click="sortCustomers(0)" class="th-text"> Name
            <mdicon 
              class="sorting-icon"
              :name="sortingDirections[0] ? 'triangle-small-up' : 'triangle-small-down'"
              size="25" 
            />
          </th>
          <th @click="sortCustomers(1)" class="th-text"> Arr
            <mdicon 
              class="sorting-icon"
              :name="sortingDirections[1] ? 'triangle-small-up' : 'triangle-small-down'"
              size="25" 
            />
          </th>
          <th @click="sortCustomers(2)" class="th-text"> ID
            <mdicon 
              class="sorting-icon"
              :name="sortingDirections[2] ? 'triangle-small-up' : 'triangle-small-down'"
              size="25" 
            />
          </th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-for="item in filteredItems" :key="item.id" class="customer-row">
          <td class="table-data">
            <router-link
              :to="{
                name: 'SingleCustomerView',
                params: { id: item.id },
              }"
              @click="processAndAddData(item)"
              class="table-link"
            >
              {{ item.name }}
            </router-link>
          </td>
          <td class="table-data">{{ item.arr }}</td>
          <td class="table-data">{{ item.id }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <ul v-if="pagesArray.length > 0" class="pagination-list">
        <mdicon 
          name="menu-left"
          role="button"
          size="50"
          :class="getIconClass('icon', pageNumber <= 1)"
          @click="splittingTheArray(pageNumber - 1)"
        />
        <li v-for="page in pagesArray" 
          :key="page"
          :class="getIconClass('item', pageNumber === page)"
          @click="splittingTheArray(page)"
        > 
          {{ page }}
        </li>
        <mdicon 
          name="menu-right"
          role="button"
          size="50" 
          :class="getIconClass('icon', pageNumber >= pagesArray.length)"
          @click="splittingTheArray(pageNumber + 1)"
        />
      </ul>
    </div>
  </div>
</template>

<style scoped>
.customer-table {
  font-family: Source Sans Pro;
	width:100%;
  border-collapse: collapse; 
  margin-top: 40px;

  .th-text {
    padding: 10px 8px;
    text-align: start;
  }
  
  .table-data {
    padding: 4px 0px 4px 10px;
    text-align: start;
    color: #a4a4a4;
  
    .table-link {
      text-decoration: none;
      color: #a4a4a4;
    }
  }
} 

.table-body {
  font-size: 18px;
  color: grey; 
}
.table-body tr {
  transition: background-color 250ms ease-out;
  background-color: #f8f6f6;
}
.table-body tr:nth-child(2n) {
  background-color:#dcdbdb;
}
.table-body tr:hover {
  font-weight: 600;
}

.table-header {
  color: var(--primary-accent);
  font-size: 21px;
  font-weight: 600;
  background-color: #6f6e6e;
  border-bottom: solid 2px var(--border-medium);
  position: sticky;
  top: 0;
  cursor: pointer;
}
.customers-header {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
} 

.customers-filter {
  height: 26px;
  min-width: 200px;
  padding-left: 6px;
  border: 1px solid var(--border-medium);
  border-radius: var(--borderRadius-small);
}

.pagination-list {
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  gap: 12px;
  justify-content: center;
  align-items: center;
}
.pagination-item {
  list-style: none;
  padding: 12px;
  font-size: 1.2em;
  font-weight: 600;
  color: #aeaeae;
  cursor: pointer;
}
.active {
  color: var(--primary-accent);
  text-decoration: underline;
  font-size: 1.5em;
}

.pgn-icon {
  color: var(--primary-accent);
  cursor: pointer;
}

.pgn-icon--disabled {
  color: #cdcdcd;
  pointer-events: none;
}

@media only screen and (min-width: 650px) {
  .customer-table {
    margin-top: 0px;
  }
}
</style>