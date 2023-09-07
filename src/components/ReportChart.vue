<script setup>
import { ref, onMounted, computed } from 'vue';
import Chart from "chart.js/auto";
import { fetchData } from "../controller/getData.js";
import { formatNumber } from "../controller/formatNumbers";
import LoadingSpinner from './LoadingSpinner.vue';
import { useLoadingStore } from "../stores/loading";
const loadingStore = useLoadingStore();

// const chartCanvas = ref(null);
let reportData = ref([]);
const chartConfig = {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "New arr per month",
        backgroundColor: "rgb(2, 176, 205)",
        borderColor: "rgn (0, 0, 0)",
        data: [],
      },
    ],
  },
  options: {
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
      }
    },
  }
};

let dataFetched = ref(false);

async function dataFormatting() {
    try {
      if (!dataFetched.value) {
      await fetchData("report", reportData.value);
      dataFetched.value = true;
    }
          const labels = reportData.value.map((obj) => obj.month);
          chartConfig.data.labels = labels;
          chartConfig.data.datasets[0].data = reportData.value.map(
            (obj) => obj.arr
          );
           if (reportData.value.length > 0) {
            createChart();
          }
          //createChart();
        } catch (err) {
          console.log("Error formatting data:", err);
        }
  }

function createChart() {
  const chartEl = document.getElementById("myChart");
  if (chartEl) {
  const myChart = new Chart(chartEl, chartConfig);
  }
};

const formattedTotalArr = computed(() => {
  return formatNumber(reportData.value.reduce((total, item) => total + item.arr, 0));
});

const totalSeats = computed(() => {
  return reportData.value.reduce((total, item) => total + item.seats, 0);
});

onMounted(() =>  {
   dataFormatting()
});
</script>

<template>
 <div class="chart-container">
  <h1>Home</h1>
  <LoadingSpinner v-if="loadingStore.isLoading" />
  <template v-else>
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
  </template>
  </div>
</template>

<style scoped>
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