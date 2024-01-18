<script setup>
import { ref, computed } from "vue";
import { formatter } from "../controller/helperFunctions";
import { useReport } from "../utils/useReport";
import ReportsViewLoader from "../components/loaders/ReportsViewLoader.vue";
import ChartComponent from "../components/ChartComponent.vue";
import BaseButton from "../components/BaseButton.vue";
import IconWrapper from "../components/IconWrapper.vue";
import Card from "../components/cards/Card.vue";
import TwoColumns from "../components/cards/TwoColumns.vue";
import CurrencyIcon from "../components/icons/CurrencyIcon.vue";
import DottedCircleIcon from "../components/icons/DottedCircleIcon.vue";
import ArrowUpRightIcon from "../components/icons/ArrowUpRightIcon.vue";
import { useUserStore } from "../stores/user";
const userStore = useUserStore();
const username = userStore.getUsername;

const reportData = ref(null);

useReport().then((data) => {
	reportData.value = data;
});

const totalRevenue = computed(() => {
	return formatter.currency(
		reportData.value.reduce((total, item) => total + item.arr, 0),
		{ format: "compact", lang: "en-US", decimals: 1 },
	);
});

const totalSeats = computed(() => {
	return formatter.number(
		reportData.value.reduce((total, item) => total + item.seats, 0),
		{ format: "compact", lang: "en-US" },
	);
});
</script>

<template>
	<div class="container">
		<ReportsViewLoader v-if="!reportData" />
		<template v-else>
			<TwoColumns class="welcome">
				<template #left-col>
					<Card>
						<template #main>
							<h1>Welcome back!</h1>
							<span>Here is the latest data available.</span>
						</template>
						<template #footer>
							<BaseButton
								class="primary"
								@click="
									$router.push({
										name: 'UserView',
										params: { username },
									})
								">
								Go to your profile
							</BaseButton>
						</template>
					</Card>
				</template>
				<template #right-col>
					<Card>
						<template #main>
							<img
								src="/graph.png"
								alt="" />
						</template>
					</Card>
				</template>
			</TwoColumns>

			<div class="overview">
				<Card
					class="grow"
					mainClass="flex-grow">
					<template #main>
						<h2>Payments</h2>
						<strong>{{ totalRevenue }}</strong>
					</template>
					<template #footer>
						<div class="card-footer">
							<IconWrapper
								style="
									background-color: color-mix(in srgb, #3facc2 15%, #ffffff5b);
								">
								<ArrowUpRightIcon
									class="icon"
									style="color: #3facc2"></ArrowUpRightIcon>
							</IconWrapper>
							<span>+9%</span>
						</div>
					</template>
				</Card>
				<Card
					class="grow"
					headerClass="flex-grow">
					<template #header>
						<img
							class="icon"
							src="/orange-chart.png"
							alt="" />
					</template>
					<template #main>
						<h2>Total seats</h2>
						<strong>{{ totalSeats }}</strong>
					</template>
				</Card>
			</div>

			<div class="chart-wrapper">
				<ul class="chart-info">
					<li
						v-for="metric in [
							{ title: 'Revenue', value: totalRevenue },
							{ title: 'Seats', value: totalSeats },
						]"
						class="chart-col">
						<h2 class="chart-name">{{ metric.title }}</h2>
						<strong class="chart-number">{{ metric.value }}</strong>
					</li>
				</ul>
				<ChartComponent />
			</div>

			<div class="overview">
				<!-- <div class="monthly-row"> -->
				<Card
					class="grow"
					headerClass="flex-grow">
					<template #header>
						<IconWrapper
							style="
								background-color: color-mix(in srgb, #fa9175 15%, #ffffff5b);
							">
							<DottedCircleIcon
								class="icon"
								style="color: #fa9175"></DottedCircleIcon>
						</IconWrapper>
					</template>
					<template #main>
						<h2>Top month</h2>
						<strong>March 2023</strong>
					</template>
				</Card>
				<Card
					class="grow"
					mainClass="flex-grow">
					<template #main>
						<h2>Sales profit</h2>
						<strong>240k</strong>
					</template>
					<template #footer>
						<div class="card-footer">
							<IconWrapper
								style="
									background-color: color-mix(in srgb, #64c7ff 15%, #ffffff5b);
								">
								<CurrencyIcon
									style="color: #64c7ff"
									class="icon" />
							</IconWrapper>
							<span>+12%</span>
						</div>
					</template>
				</Card>
				<!-- </div> -->
			</div>
		</template>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 2rem;
}

.overview {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	flex: 1 0 40%;
}

.grow {
	flex: 1 0 20%;

	h2 {
		font-weight: normal;
	}
}

.monthly-sales {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 1rem;

	& > * {
		flex: 1 0 50%;
	}
}

/* .monthly-row {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
} */

.stats {
	display: flex;
	flex-direction: row;
	width: 100%;
	flex-wrap: wrap;
	gap: 1rem;

	& > .pie-chart {
		flex: 1 1 100px;
	}

	img {
		max-width: 100px;
	}
}

.card-footer {
	display: flex;
	align-items: center;
	gap: 0.6rem;
}

.chart-wrapper {
	box-shadow: #919eab4d 0 0 2px, #919eab1f 0 12px 24px -4px;
	padding: 1rem;
	border-radius: 8px;
	flex: 1 0 55%;
	display: flex;
	flex-direction: column;
	container: chart / inline-size;
}

.chart-info {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.chart-col {
	display: flex;
	flex-direction: column;
}
.chart-name {
	color: #a4aabd;
	font-weight: 600;
	font-size: 1rem;
}
.chart-number {
	font-size: 1.3rem;
	font-weight: 600;
	margin: 0 0 20px 0;
}
</style>
