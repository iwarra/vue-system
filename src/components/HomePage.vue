<script setup>
import LoadingSpinner from './LoadingSpinner.vue';
import { useLoadingStore } from "../stores/loading";
const loadingStore = useLoadingStore();
</script>

<template>
  <div class="hello">
    <template v-if="loadingStore.isLoading">
      <LoadingSpinner />
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<style scoped>
.hello {
  max-width: 80vw;
  margin: 0 auto;
}
</style>
