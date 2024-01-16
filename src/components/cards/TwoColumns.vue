<template>
	<div class="two-col-wrapper">
		<slot name="left-col"></slot>

		<slot name="right-col"></slot>
	</div>
</template>

<script setup></script>

<style scoped>
.two-col-wrapper {
	display: flex;
	flex-direction: row;
	box-shadow: #919eab4d 0 0 2px, #919eab1f 0 12px 24px -4px;
	border-radius: 8px;
	justify-content: space-around;
	align-items: center;
}

.two-col-wrapper :deep(.card) {
	box-shadow: initial;
	border-radius: initial;
}

.heading-card {
	background-color: #ecf2ff;
	flex: 1 0 100%;
}

.welcome {
	background-color: #ecf2ff;
	flex: 1 0 55%;
}
</style>
