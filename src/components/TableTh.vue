<script setup>
import ArrowDownIcon from "./icons/ArrowDownIcon.vue";
import ArrowUpIcon from "./icons/ArrowUpIcon.vue";
const props = defineProps(["columnSorted", "value"]);
</script>

<template>
	<th class="th-text">
		<slot></slot>
		<ArrowDownIcon
			class="icon-small"
			v-if="
				value === columnSorted.by && columnSorted.sortingOrder === 'ascending'
			" />
		<ArrowUpIcon
			class="icon-small"
			v-if="
				value === columnSorted.by && columnSorted.sortingOrder === 'descending'
			" />
	</th>
</template>

<style scoped>
.th-text {
	text-align: start;
	display: flex;
	align-items: center;
}
</style>
