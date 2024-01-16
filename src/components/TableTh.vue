<script setup>
const props = defineProps(["columnSorted", "value"]);
</script>

<template>
	<th class="th-text">
		<slot></slot>
		<mdicon
			v-if="
				value === columnSorted.by && columnSorted.sortingOrder === 'ascending'
			"
			name="triangle-small-down"
			class="sorting-icon"
			size="25" />
		<mdicon
			v-if="
				value === columnSorted.by && columnSorted.sortingOrder === 'descending'
			"
			name="triangle-small-up"
			class="sorting-icon"
			size="25" />
	</th>
</template>

<style scoped>
.th-text {
	text-align: start;
}
</style>
