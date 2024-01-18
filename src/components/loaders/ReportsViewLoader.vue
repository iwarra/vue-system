<script setup>
import Card from "../cards/Card.vue";
</script>

<template>
	<Card class="big"></Card>
	<div class="group">
		<Card></Card>
		<Card></Card>
	</div>
	<Card class="big"></Card>
	<div class="group">
		<Card></Card>
		<Card></Card>
	</div>
</template>

<style scoped>
.big {
	flex: 1 0 55%;
	min-height: 200px;
}

.group {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	flex: 1 0 40%;

	& > * {
		flex: 1;
		min-height: 200px;
		min-width: 200px;
	}
}

.big,
.group > * {
	background: #eee;
	background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
	border-radius: 5px;
	background-size: 200% 100%;
	animation: 1.5s shine linear infinite;
}

@keyframes shine {
	to {
		background-position-x: -200%;
	}
}
</style>
