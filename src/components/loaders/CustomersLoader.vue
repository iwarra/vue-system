<script setup>
import Card from "../cards/Card.vue";
</script>

<template>
	<Card class="large"></Card>
	<Card class="extra-large"></Card>
</template>

<style scoped>
.large {
	min-height: 200px;
	flex-basis: 100%;
}

.extra-large {
	min-width: 100%;
	flex: 1 0 100%;
	min-height: 500px;
	height: 100%;
}

.large,
.extra-large {
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
