<script setup>
import HeaderComponent from "./components/HeaderComponent.vue";
import HomePage from "./components/HomePage.vue";
import LoginForm from "./components/LoginForm.vue";
import { onMounted } from "vue";
import { useUserStore } from "./stores/user";
import { useThemesStore } from "./stores/themes";
const themesStore = useThemesStore();
const userStore = useUserStore();

function autoLogin(user) {
	// If the user exists in local storage on create, update the user store info
	userStore.setLogIn(true);
	userStore.setCurrentUser(user);
}

onMounted(() => {
	const user = localStorage.getItem("user");
	if (user) {
		autoLogin(user);
	}
});
</script>

<template>
	<LoginForm v-if="!userStore.isLoggedIn" />
	<div
		v-else
		:class="[themesStore.theme === 'light' ? 'light-theme' : 'dark-theme']">
		<HeaderComponent v-if="userStore.isLoggedIn" />
		<main class="app-main page-positioning">
			<HomePage />
		</main>
	</div>
</template>

<style>
.light-theme {
	min-height: -webkit-fill-available;
	min-height: 100vh;
	background-color: var(--primary-light);
	color: var(--font-dark);
	display: flex;
	flex-direction: column;
	transition: var(--theme-transition);

	.header-content {
		background-color: var(--primary-light);
		transition: var(--theme-transition);
	}

	a {
		color: black;
	}
}
.dark-theme {
	min-height: -webkit-fill-available;
	min-height: 100vh;
	background-color: var(--dark-theme-background);
	color: var(--primary-light);
	display: flex;
	flex-direction: column;
	transition: var(--theme-transition);

	.header-content {
		background-color: var(--dark-theme-background);
		transition: var(--theme-transition);
	}

	.heading-card,
	.welcome {
		background-color: color-mix(in srgb, #ecf2ff 60%, #253662) !important;
	}

	.wrapper {
		background-color: var(--dark-theme-background);
		color: var(--primary-light);
		box-shadow: 0 5px 5px -3px #0003, 0 8px 10px 1px #00000024,
			0 3px 14px 2px #0000001f;
	}

	.secondary {
		background-color: var(--dark-theme-background);
	}

	a {
		color: white !important;
	}

	input[type="password"],
	input[type="text"],
	select {
		background-color: var(--dark-theme-background);
		color: var(--primary-light);
	}

	.color {
		opacity: 0.85;
	}

	thead {
		background-color: var(--dark-theme-background) !important;
	}

	.login-input,
	.login-btn,
	.customers-filter {
		background-color: var(--primary-dark);
		color: var(--primary-light);
	}
}

.app-main {
	width: 100%;
	flex: 1;
	margin-block: 3rem;
}
</style>
