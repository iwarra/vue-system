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
	userStore.setCurrentUser(user.username);
}

onMounted(() => {
	const user = localStorage.getItem("user");
	if (user) {
		autoLogin(JSON.parse(user));
	}
});
</script>

<template>
	<div :class="[themesStore.theme === 'light' ? 'light-theme' : 'dark-theme']">
		<HeaderComponent />
		<main class="app-main page-positioning">
			<LoginForm v-if="!userStore.isLoggedIn" />
			<HomePage v-else />
		</main>
	</div>
</template>

<style>
.light-theme {
	min-height: 100vh;
	min-height: -webkit-fill-available;
	background-color: var(--primary-light);
	color: var(--font-dark);
	display: flex;
	flex-direction: column;
	transition: var(--theme-transition);

	.header-content {
		background-color: var(--primary-light);
		transition: var(--theme-transition);
	}
}
.dark-theme {
	min-height: 100vh;
	min-height: -webkit-fill-available;
	background-color: var(--primary-dark);
	color: var(--primary-light);
	display: flex;
	flex-direction: column;
	transition: var(--theme-transition);

	.header-wrapper {
		box-shadow: rgba(225, 224, 224, 0.12) 0px 4px 10px;
	}

	.header-content {
		background-color: var(--primary-dark);
		transition: var(--theme-transition);
	}

	/* .customer-table {
	
	} */

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
