<script setup></script>

<template>
	<button type="button">
		<slot></slot>
	</button>
</template>

<style scoped>
button {
	padding-block: 0.6rem;
	padding-inline: 1rem;
	border-radius: 8px;
	border: none;
	cursor: pointer;
}

button:hover {
	filter: brightness(97%);
}

.primary {
	background-color: var(--primary-accent);
	color: white;
}

.secondary {
	background-color: white;
	color: var(--primary-accent);
	border: 1px solid var(--primary-accent);
}

.cancel {
	background-color: white;
	color: #fa896b;
	border: 1px solid #fa896b;
}
</style>
