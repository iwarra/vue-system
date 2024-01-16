<script setup>
import { inject } from "vue";
import { formatter } from "../controller/helperFunctions";
import Card from "../components/cards/Card.vue";
import TwoColumns from "../components/cards/TwoColumns.vue";
import DottedCircleIcon from "../components/icons/DottedCircleIcon.vue";
import UserIcon from "../components/icons/UserIcon.vue";
import CoinsIcon from "../components/icons/CoinsIcon.vue";
const customer = inject("customer");
</script>

<template>
	<div class="container">
		<TwoColumns class="heading-card">
			<template #left-col>
				<Card>
					<template #main>
						<h1>{{ customer.name }}</h1>
						<span>Welcome to customers page!</span>
					</template>
				</Card>
			</template>
			<template #right-col>
				<Card>
					<template #main>
						<img
							src="/pie.png"
							alt="" />
					</template>
				</Card>
			</template>
		</TwoColumns>

		<div class="customer-info">
			<Card style="background-color: #fef5e5">
				<template #header>
					<DottedCircleIcon
						class="icon-larger"
						style="color: #ffae1f" />
				</template>
				<template #main>
					<span>Number of seats</span>
					<strong>{{ customer.seats }}</strong>
				</template>
			</Card>
			<Card style="background-color: #e6fffa">
				<template #header>
					<CoinsIcon
						class="icon-larger"
						style="color: #30ac8d" />
				</template>
				<template #main>
					<span>Revenue</span>
					<strong>{{ formatter.currency(customer.arr) }}</strong>
				</template>
			</Card>
			<Card style="background-color: #e8f7ff">
				<template #header>
					<UserIcon
						class="icon-larger"
						style="color: #49beff" />
				</template>
				<template #main>
					<span>Created at</span>
					<strong v-if="customer.createdAt">{{
						formatter.date(customer.createdAt.slice(0, 10))
					}}</strong>
				</template>
			</Card>
		</div>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 2rem;
}

.container > .card {
	flex: 1 1 350px;
}

.customer-info .card:deep(.main) {
	text-align: center;
}

.customer-info {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	width: 100%;

	& > .card {
		flex: 1 1 350px;
	}

	.card {
		align-items: center;
		justify-content: center;
		min-height: 10rem;

		span {
			font-size: 0.9rem;
			font-weight: 400;
			display: block;
		}

		strong {
			font-size: 1.3rem;
		}
	}
}
</style>
