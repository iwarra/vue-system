<script setup></script>

<template>
  <div class="style-container">
    <slot></slot>
  </div>
</template>

<style scoped>
.style-container {
		background-color: #97d6fa42;
		width: 40px;
		height: 40px;
		border-radius: 7px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.icon-wrapper-larger {
		width: 48px;
		height: 48px;
	}
</style>