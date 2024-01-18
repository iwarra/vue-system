<script setup>
import { ref, computed, watch } from "vue";
import { useCustomers } from "../utils/useCustomers.js";
import { splitArrayBy, sortArrayBy } from "../controller/helperFunctions";
import Card from "../components/cards/Card.vue";
import SelectContainer from "../components/SelectContainer.vue";
import SelectOptions from "../components/SelectOptions.vue";
import TableTd from "../components/TableTd.vue";
import TableTh from "../components/TableTh.vue";
import TwoColumns from "../components/cards/TwoColumns.vue";
import ArrowLeftIcon from "../components/icons/ArrowLeftIcon.vue";
import ArrowRightIcon from "../components/icons/ArrowRightIcon.vue";
import CustomersLoader from "../components/loaders/CustomersLoader.vue";

const columnSorted = ref({ by: "id", sortingOrder: "ascending" });
const itemsPerPage = [5, 10, 20];
const pageNr = ref(0);
const selected = ref(10);
const searchInput = ref("");
const initialData = ref(null);
const customersProxy = ref(null);
const customers = ref(getCustomers());
const fromNumOfRows = ref(1);
const toNumOfRows = ref(null);
const numOfRowsTotal = computed(() => customers.value.flat().length);

const sortBy = computed(() => {
	console.log(columnSorted.value.sortingOrder)
	return columnSorted.value.sortingOrder === "ascending"
		? "descending"
		: "ascending";
});

const columns = [
	{ title: "ID", value: "id" },
	{
		title: "Name",
		value: "name",
		link: {
			name: "SingleCustomerView",
		},
	},
	{ title: "Revenue", value: "arr" },
];

watch(customers, () => {
	fromNumOfRows.value = 1;
	toNumOfRows.value = customers.value.at(pageNr.value).length;
});

function handlePagination(direction) {
	const child = customers.value.at(0);

	if (direction === "right") {
		++pageNr.value;
		toNumOfRows.value += customers.value.at(pageNr.value).length;
		fromNumOfRows.value += child.length;
	}
	if (direction === "left") {
		toNumOfRows.value -= customers.value.at(pageNr.value).length;
		fromNumOfRows.value -= child.length;
		--pageNr.value;
	}
}

function getCustomers() {
	if (initialData.value) {
		const array = initialData.value.flat();
		const searchTerm = searchInput.value.toLowerCase();
		pageNr.value = 0;

		const filterByName = (customer) => {
			const customerName = customer.name.toLowerCase();
			return customerName.includes(searchTerm);
		};

		customers.value = splitArrayBy(
			selected.value,
			sortArrayBy(array, columnSorted.value).filter(filterByName),
		);
		return;
	}

	if (!initialData.value) {
		useCustomers().then((res) => {
			const splittedArray = splitArrayBy(
				selected.value,
				sortArrayBy(res, columnSorted.value),
			);
			customersProxy.value = splittedArray;
			initialData.value = splittedArray;
		});
	}
	return customersProxy;
}
</script>

<template>
	<div class="container">
		<CustomersLoader v-if="!customers"></CustomersLoader>
		<template v-else>
			<TwoColumns class="heading-card">
				<template #left-col>
					<Card>
						<template #main>
							<h2>Customers preview</h2>
							<span>Get the latest customer info</span>
						</template>
					</Card>
				</template>
				<template #right-col>
					<Card>
						<template #main>
							<img
								src="/mock-data.png"
								alt="" />
						</template>
					</Card>
				</template>
			</TwoColumns>
			<div class="table-card">
				<div class="table-heading">
					<SelectContainer>
						<label>Items per page:</label>
						<select
							v-model="selected"
							name="itemsPerPage"
							id="itemsPerPage"
							@change="getCustomers()">
							<SelectOptions :options="itemsPerPage" />
						</select>
					</SelectContainer>
					<input
						v-model="searchInput"
						@input="getCustomers()"
						type="text"
						placeholder="Search here" />
				</div>
				<table
					ref="table"
					class="customer-table">
					<thead class="table-header">
						<tr>
							<TableTh
								v-for="col in columns"
								@click="
									() => {
										columnSorted = { by: col.value, sortingOrder: sortBy };
										getCustomers();
									}
								"
								:id="col.value"
								:value="col.value"
								:columnSorted="columnSorted">
								{{ col.title }}
							</TableTh>
						</tr>
					</thead>
					<tbody class="table-body">
						<tr
							v-for="row in customers.at(pageNr)"
							:key="row.id"
							class="table-row">
							<TableTd
								v-for="cell in columns"
								class="table-data"
								:id="cell.value"
								:row="row"
								:column="cell.value"
								:link="cell.link">
								{{ row[cell.value] }}
							</TableTd>
						</tr>
					</tbody>
				</table>
				<div class="pagination">
					<SelectContainer class="sorting">
						<label>Items per page:</label>
						<select
							v-model="selected"
							name="itemsPerPage"
							id="itemsPerPage"
							@change="getCustomers()">
							<SelectOptions :options="itemsPerPage" />
						</select>
					</SelectContainer>
					<div class="navigation">
						<ArrowLeftIcon
							role="button"
							class="icon-small"
							@click="handlePagination('left')"
							:class="pageNr === 0 ? 'pgn-icon--disabled' : 'pgn-icon'" />
						<span
							>{{ fromNumOfRows }} - {{ toNumOfRows }} of
							{{ numOfRowsTotal }}</span
						>
						<ArrowRightIcon
							role="button"
							class="icon-small"
							:class="
								pageNr === customers.length - 1
									? 'pgn-icon--disabled'
									: 'pgn-icon'
							"
							@click="handlePagination('right')" />
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

.table-card {
	padding: 1.5rem;
	box-shadow: #919eab4d 0 0 2px, #919eab1f 0 12px 24px -4px;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	gap: 2.5rem;
}

.table-heading {
	display: flex;
	flex-wrap: wrap;
	gap: 1.5rem;
	align-items: center;
	justify-content: space-between;
}
.customer-table {
	width: 100%;
	font-size: 1rem;

	& > th,
	tr {
		padding-block: 1.3rem;
		display: flex;
		gap: 1rem;
		border-bottom: 1px solid rgb(224, 223, 223);
	}

	.table-row {
		align-items: center;
	}

	#id {
		flex: 0 1 50px;
	}

	#name {
		flex: 1 0 15ch;
	}

	tr:last-of-type {
		border-bottom: none;
	}
}

#arr {
	flex: 0 1 100px;
}

@media (max-width: 530px) {
	#arr {
		display: none;
	}
}

@media (min-width: 800px) {
	#arr {
		flex: 0 1 220px;
	}
}

.table-header {
	position: sticky;
	top: 0;
	cursor: pointer;
	background-color: #fff;
	z-index: 1;
}

.pagination {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 1.5rem;
	container-type: inline-size;
}

.sorting {
	order: 1;
}

.navigation {
	display: flex;
	gap: 1rem;
	align-items: center;
	order: 2;
}

@container (max-width: 600px) {
	.sorting {
		order: 2;
	}

	.navigation {
		order: 1;
	}
}

.active {
	color: var(--primary-accent);
	text-decoration: underline;
	font-size: 1.5rem;
}

.pgn-icon {
	color: var(--primary-accent);
	cursor: pointer;
}

.pgn-icon--disabled {
	color: #cdcdcd;
	pointer-events: none;
}
</style>
