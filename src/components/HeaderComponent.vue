<script setup>
import { useThemesStore } from "../stores/themes";
import { useUserStore } from "../stores/user";
import { ref } from "vue";
import UserMenu from "./UserMenu.vue";
import LogoIcon from "../components/icons/LogoIcon.vue";
import SunIcon from "../components/icons/SunIcon.vue";
import MoonIcon from "../components/icons/MoonIcon.vue";

const userStore = useUserStore();
const themeStore = useThemesStore();
let isMenuVisible = ref(false);

function closeDropdown() {
	isMenuVisible.value = false;
}
</script>

<template>
	<header class="header-wrapper">
		<div class="page-positioning">
			<div class="header-content">
				<div class="header-info">
					<div class="header-logo">
						<LogoIcon class="logo"></LogoIcon>
						<span>Dash</span>
					</div>
					<nav
						v-if="userStore.isLoggedIn"
						class="header-nav">
						<router-link
							to="/"
							exact
							class="nav-link"
							active-class="active-link"
							>Home</router-link
						>
						<router-link
							to="/customers"
							class="nav-link"
							active-class="active-link"
							>Customers</router-link
						>
					</nav>
				</div>
				<div class="header-icons">
					<SunIcon
						v-if="themeStore.getTheme === 'light'"
						class="icon-smaller light"
						@click="themeStore.toggleTheme"></SunIcon>
					<MoonIcon
						v-if="themeStore.getTheme === 'dark'"
						class="icon-smaller dark"
						@click="themeStore.toggleTheme"></MoonIcon>
					<div class="header-user">
						<img
							@click="isMenuVisible = !isMenuVisible"
							class="user-avatar"
							src="/user-pic.png"
							alt="user avatar" />
						<UserMenu
							class="dropdown-menu"
							:class="{ show: isMenuVisible }"
							@close="closeDropdown" />
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<style scoped>
.dropdown-menu {
	position: absolute;
	width: 350px;
	top: 100%;
	right: -10px;
	cursor: not-allowed;
	pointer-events: none;
	opacity: 0;
	transition-property: top, right, opacity;
	transition-duration: 0.2s;
	transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.show {
	top: calc(100% + 10px);
	right: 0px;
	pointer-events: auto;
	cursor: pointer;
	padding: 2rem;
	opacity: 1;
	transition-property: top, right, opacity;
	transition-duration: 0.2s;
	transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.page-positioning {
	margin: 0 auto;
}
.header-wrapper {
	box-shadow: #0000000d 0 9px 17.5px;
	position: relative;
	z-index: 2;
}

.header-content {
	display: flex;
	flex-direction: row;
	gap: 1rem;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	padding-block: 1.5rem;
}

.header-info,
.header-user {
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 1.5rem;
}
.header-info {
	flex-wrap: wrap;
}

.header-logo {
	display: flex;
	gap: 0.5rem;
	font-weight: 600;
	font-size: 24px;
}

.logo {
	color: #49beff;
}

.header-icons {
	display: flex;
	gap: 1.5rem;
	align-items: center;
}

.dark {
	color: #f2f1e6;
	cursor: pointer;
}

.light {
	color: #f5bb00;
	cursor: pointer;
}

.user-avatar {
	/* border-radius: 50%; */
	height: 24px;
	width: 24px;
	cursor: pointer;
}

.light:hover,
.dark:hover,
.user-avatar:hover {
	opacity: 0.9;
}

.header-nav {
	display: flex;
	gap: 0.8rem;
}

.nav-link {
	font-size: 0.95rem;
	text-decoration: none;
	color: rgba(0, 0, 0, 0.87);
}
.active-link {
	font-weight: 600;
	color: var(--primary-accent);
	text-decoration: underline;
}

@media (max-width: 500px) {
	.header-info,
	.header-user {
		gap: 1rem;
	}

	.header-logo {
		span {
			display: none;
		}
	}

	.show {
		max-width: 85svw;
	}
}
</style>
