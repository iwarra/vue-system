<template>
	<option
		v-for="val in options"
		:value="val">
			{{ val }}
	</option>
</template>

<script setup>
const props = defineProps(["options"]);
</script>

<style scoped>

</style>
