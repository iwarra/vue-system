<script setup>
import { ref } from "vue";
import {
	Chart,
	BarController,
	BarElement,
	CategoryScale,
	LinearScale,
} from "chart.js";
import { useReport } from "../utils/useReport";

Chart.register(BarController, BarElement, CategoryScale, LinearScale);
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

const chart = ref(null);

useReport().then((data) => {
	data.forEach((item) => {
		chartConfig.data.labels.push(item.month);
		chartConfig.data.datasets[0].data.push(item.arr);
	});
	new Chart(chart.value, chartConfig);
});
</script>

<template>
	<div class="chart-container">
		<canvas ref="chart"></canvas>
	</div>
</template>

<style scoped>
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
</style>
