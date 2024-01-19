<script setup>
import { inject } from "vue";
import { useRoute } from "vue-router";
import { formatter } from "../controller/helperFunctions";
import Card from "../components/cards/Card.vue";
import TwoColumns from "../components/cards/TwoColumns.vue";
import DottedCircleIcon from "../components/icons/DottedCircleIcon.vue";
import UserIcon from "../components/icons/UserIcon.vue";
import CoinsIcon from "../components/icons/CoinsIcon.vue";
const route = useRoute();
const injected = inject("customer").value;
const customer = {
	arr: injected.arr ?? 200_000,
	seats: injected.seats ?? 66,
	createdAt: injected.createdAt ?? "2013-05-23",
};

const capitalizeWords = (str) =>
	str.replace(/\b\w/g, (char) => char.toUpperCase());

const breadcrumbs = route.fullPath
	.substring(1)
	.split("/")
	.map((path) => {
		return capitalizeWords(path.replaceAll("-", " "));
	});

const customerName = breadcrumbs.at(-1);
</script>

<template>
	<div class="container">
		<TwoColumns class="heading-card">
			<template #left-col>
				<Card>
					<template #main>
						<div class="breadcrumbs">
							<span
								key="route"
								class="light"
								v-for="(route, index) in breadcrumbs">
								<div v-if="index !== breadcrumbs.length - 1">
									<router-link :to="{ name: route.toLowerCase() }">
										{{ route }}
									</router-link>
									<span class="divider">/</span>
								</div>
								<span
									v-else
									class="bolder"
									>{{ route }}</span
								>
							</span>
						</div>
						<h1>{{ customerName }}</h1>
					</template>
				</Card>
			</template>
			<template #right-col>
				<Card>
					<template #main>
						<img
							src="/customer-header.png"
							alt="" />
					</template>
				</Card>
			</template>
		</TwoColumns>

		<div class="customer-info">
			<Card
				class="color"
				style="background-color: #fef5e5df; color: #feab1b">
				<template #header>
					<DottedCircleIcon class="icon-larger" />
				</template>
				<template #main>
					<span>Number of seats</span>
					<strong>{{ customer.seats }}</strong>
				</template>
			</Card>
			<Card
				class="color"
				style="background-color: #e6fffada; color: #30ac8d">
				<template #header>
					<CoinsIcon class="icon-larger" />
				</template>
				<template #main>
					<span>Revenue</span>
					<strong>{{ formatter.currency(customer.arr) }}</strong>
				</template>
			</Card>
			<Card
				class="color"
				style="background-color: #e8f7ffd3; color: #2eb3fa">
				<template #header>
					<UserIcon class="icon-larger" />
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

.breadcrumbs {
	display: flex;
	text-decoration: none;
	list-style: none;
	gap: 0.8rem;
	font-size: 14px;

	.light {
		a {
			text-decoration: none;
			color: var(--font-lighter);
		}
	}

	.divider {
		margin-left: 0.8rem;
		color: var(--font-lighter);
	}
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
