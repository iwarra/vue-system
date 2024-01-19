<script setup>
import { inject } from "vue";
import { formatter } from "../controller/helperFunctions";
import ChainIcon from "./icons/ChainIcon.vue";
const customer = inject("customer");
const props = defineProps(["row", "column", "link"]);
</script>

<template>
	<td>
		<div
			v-if="link"
			class="name-cell"
			@click="() => (customer = row)">
			<router-link
				:to="{
					name: link.name,
					params: { name: row.name.replaceAll(' ', '-').toLowerCase() },
				}">
				<strong>
					<slot></slot>
				</strong>
				<ChainIcon class="link-icon"></ChainIcon>
			</router-link>
			<span>Seats: {{ row.seats }}</span>
		</div>

		<template v-else-if="column === 'arr'">{{
			formatter.currency(row.arr)
		}}</template>

		<template v-else><slot></slot></template>
	</td>
</template>

<style scoped>
.name-cell {
	display: inline-flex;
	flex-direction: column;
}

.link-icon {
	width: 20px;
	height: 15px;
	margin-left: 5px;
}

a {
	text-decoration: none;
	color: black;
}
</style>
