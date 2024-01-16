<script setup>
import { ref, onMounted, computed } from "vue";
import Chart from "chart.js/auto";
import { fetchData } from "../controller/getData.js";
import { formatNumber } from "../controller/formatNumbers";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import { useLoadingStore } from "../stores/loading";
import CardEl from "../components/CardEl.vue";
const loadingStore = useLoadingStore();
// const userStore = useUserStore();
// const username = userStore.getUsername;


let reportData = ref([]); // fetch here already
const chartConfig = {
	type: "bar",
	data: {
		labels: [],
		datasets: [
			{
				label: "New arr per month",
				backgroundColor: "rgb(93, 135, 255)",
				borderColor: "rgb (0, 0, 0)",
				data: [],
			},
		],
	},
	options: {
		responsive: true,
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

let isFetched = ref(false); // just check if reportData.value exists


async function dataFormatting() {
	try {
		if (!isFetched.value) {
			reportData.value = await fetchData("report", reportData.value);
			isFetched.value = true;
		}
		const labels = reportData.value.map((obj) => obj.month);
		chartConfig.data.labels = labels;
		chartConfig.data.datasets[0].data = reportData.value.map((obj) => obj.arr);
		if (reportData.value.length > 0) {
			createChart();
		}
	} catch (err) {
		console.log("Error formatting data:", err);
	}
}

function createChart() {
	const chartEl = document.getElementById("myChart");
	if (chartEl) {
		const myChart = new Chart(chartEl, chartConfig);
	}
}

const formattedTotalArr = computed(() => {
	return formatNumber(
		reportData.value.reduce((total, item) => total + item.arr, 0),
	);
});

const totalSeats = computed(() => {
	return reportData.value.reduce((total, item) => total + item.seats, 0);
});

onMounted(() => {
	dataFormatting();
});

// to format a date nicely
/* function dateFormat(date) {
	return new Intl.DateTimeFormat("sv-SE").format(new Date(date));
} */
</script>

<template>
	<div class="container">
		<!-- <h1>Welcome</h1> -->
		<LoadingSpinner v-if="loadingStore.isLoading" />
		<template v-else>
			<div class="home">
				<CardEl
					title="Welcome back!"
					subtitle="Here is the latest data available."
					class="welcome">
					<template #footer>
						<button type="button">Go to your profile</button>
					</template>
					<template #card-col2>
						<img
							src="/graph.png"
							alt="" />
					</template>
				</CardEl>
				<CardEl
					title="Payments"
					:subtitle="`$${formattedTotalArr}`"
					class="grow">
					<template #footer>
						<div class="card-footer">
							<img
								src="../assets/arrow.png"
								alt="" />
							<p>+9%</p>
						</div>
					</template>
				</CardEl>
				<CardEl
					title="Best results"
					subtitle="March 2023"
					class="grow"></CardEl>

				<div class="chart-wrapper">
					<div class="chart-info">
						<div class="chart-col">
							<span class="chart-name">Arr</span>
							<p class="chart-number">${{ formattedTotalArr }}</p>
						</div>
						<div class="chart-col">
							<span class="chart-name">Seats</span>
							<p class="chart-number">{{ totalSeats }}</p>
						</div>
					</div>
					<canvas id="myChart"></canvas>
				</div>

				<div class="monthly-sales">
					<div class="monthly-row">
						<CardEl
							title="Best Month"
							subtitle="March 2023"
							class="grow"></CardEl>
						<CardEl
							title="More about march"
							subtitle="240.000"
							class="grow"></CardEl>
					</div>
					<CardEl
						title="Large card"
						subtitle="Card subtitle"
						image="/data-charts.png"
						class="grow"></CardEl>
				</div>
			</div>
		</template>
	</div>
</template>

<style scoped>
.home {
	/* display: grid;
	grid-template-rows: auto;
	grid-template-columns: 1fr 1fr;
	grid-gap: 3rem 1rem; */
	margin-top: 2rem;

	/* new */
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 2rem;
}

.monthly-sales {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.monthly-row {
	display: flex;
	gap: 1rem;
}

.welcome {
	display: flex;
	justify-content: space-around;
	align-items: center;
	background-color: #ecf2ff;
	flex: 1 0 50%;

	img {
		max-height: 10rem;
	}

	@media (max-width: 1000px) {
		img {
			display: none;
		}
	}

	button {
		align-self: flex-start;
		padding: 0.6rem;
		background-color: #5d87ff;
		border-radius: 8px;
		border: none;
		color: white;
	}
}

.card-footer {
	display: flex;
	align-items: center;
	gap: 0.6rem;
	font-size: 1.3rem;

	img {
		height: 1.6rem;
	}
}

.chart-wrapper {
	box-shadow: #919eab4d 0 0 2px, #919eab1f 0 12px 24px -4px;
	padding: 1rem;
	border-radius: 8px;
	flex: 1 0 50%;
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
}
.chart-number {
	font-size: 2rem;
	font-weight: 600;
	margin: 0 0 20px 0;
}
</style>
