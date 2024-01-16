<script setup>
const props = defineProps(["headerClass", "mainClass", "footerClass"]);
import { useSlots } from "vue";

const slots = useSlots();
</script>

<template>
	<div class="card">
		<div
			class="header"
			:class="headerClass"
			v-if="slots.header">
			<slot name="header"></slot>
		</div>
		<div
			class="main"
			:class="mainClass"
			v-if="slots.main">
			<slot name="main"></slot>
		</div>
		<div
			class="footer"
			:class="footerClass"
			v-if="slots.footer">
			<slot name="footer"></slot>
		</div>
	</div>
</template>

<style scoped>
.card {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 1.5rem;
	box-shadow: #919eab4d 0 0 2px, #919eab1f 0 12px 24px -4px;
	border-radius: 8px;
}

.main :deep(strong) {
	font-weight: 600;
	font-size: 1.5rem;
}

/* Styling for double column cards */
.welcome .main:deep(img) {
	max-height: 8rem;
}

.heading-card .main:deep(img) {
	max-height: 8rem;
}

.heading-card .main:deep(h2) {
	font-size: 20px;
}

@media (max-width: 800px) {
	.heading-card .main:deep(img) {
		display: none;
	}
}

@media (max-width: 1000px) {
	.welcome .main:deep(img) {
		display: none;
	}
}
</style>
