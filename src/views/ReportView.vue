<script setup>
import { ref, watchEffect, computed } from "vue";
import { formatter } from "../controller/helperFunctions";
import Chart from "chart.js/auto";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import Card from "../components/cards/Card.vue";
import TwoColumns from "../components/cards/TwoColumns.vue";
import CurrencyIcon from "../components/icons/CurrencyIcon.vue";
import BaseButton from "../components/BaseButton.vue";
import IconWrapper from "../components/IconWrapper.vue";
import DottedCircleIcon from "../components/icons/DottedCircleIcon.vue";
import ArrowUpRightIcon from "../components/icons/ArrowUpRightIcon.vue";
const chartConfig = {
	type: "bar",
	data: {
		labels: [],
		datasets: [
			{
				backgroundColor: "rgb(93, 135, 255)",
				borderColor: "rgb (0, 0, 0)",
				data: [],
			},
		],
	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false, //hides the labels
			},
		},
		scales: {
			x: {
				grid: {
					display: false, // Hide vertical grid lines on the X-axis
				},
			},
			y: {
				beginAtZero: true,
				grid: {
					display: false, // Hide vertical grid lines on the X-axis
				},
			},
		},
	},
};

const reportData = ref(null);
const chart = ref(null);

const BASE_URL = "https://startdeliver-mock-api.glitch.me";
fetch(`${BASE_URL}/report`)
	.then((res) => {
		if (!res.ok) throw new Error("fetch is not going well");
		return res.json();
	})
	.then((reports) => {
		const { data } = reports;
		reportData.value = data;

		//Formatting for chart.js chart
		data.forEach((item) => {
			chartConfig.data.labels.push(item.month);
			chartConfig.data.datasets[0].data.push(item.arr);
		});
	});

watchEffect(() => {
	if (chart.value) {
		new Chart(chart.value, chartConfig);
	}
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
		<LoadingSpinner v-if="!reportData" />
		<template v-else>
			<TwoColumns class="welcome">
				<template #left-col>
					<Card>
						<template #main>
							<h1>Welcome back!</h1>
							<span>Here is the latest data available.</span>
						</template>
						<template #footer>
							<BaseButton class="primary">Go to your profile</BaseButton>
						</template>
					</Card>
				</template>
				<template #right-col>
					<Card class="">
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
									background-color: color-mix(in srgb, #5a929d 15%, white);
								">
								<ArrowUpRightIcon
									class="icon"
									style="color: #5a929d"></ArrowUpRightIcon>
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
							src="/orange.png"
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
				<div class="chart-container">
					<canvas ref="chart"></canvas>
				</div>
			</div>

			<div class="monthly-sales">
				<div class="monthly-row">
					<Card
						class="grow"
						headerClass="flex-grow">
						<template #header>
							<IconWrapper
								style="
									background-color: color-mix(in srgb, #fa9175 15%, white);
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
								<IconWrapper>
									<CurrencyIcon
										style="color: #64c7ff"
										class="icon" />
								</IconWrapper>
								<span>+12%</span>
							</div>
						</template>
					</Card>
				</div>
				<Card class="grow">
					<template #footer>
						<!-- <div class="stats">
							<img
								class="pie-chart"
								src="/pie-1.svg"
								alt="" />
							<img
								class="pie-chart"
								src="/pie-2.svg"
								alt="" />
							<img
								class="pie-chart"
								src="/pie-3.svg"
								alt="" />
						</div> -->
					</template>
					<template #main>
						<h2>Weekly stats</h2>
					</template>
				</Card>
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
	flex-direction: column;
	flex-wrap: wrap;
	gap: 1rem;
	flex: 1 0 40%;
}

.monthly-row {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
}

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

.chart-container {
	flex: 1;
}

@container chart (max-width: 100vw) {
	.chart-container {
		position: relative;
		height: 280px;
		width: 100%;
		margin: 0 auto;
	}
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
