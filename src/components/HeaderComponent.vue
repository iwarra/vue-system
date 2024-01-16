<script setup>
import { useThemesStore } from "../stores/themes";
import { useUserStore } from "../stores/user";
import { ref } from "vue";
import UserMenu from "./UserMenu.vue";
import LogoIcon from "../components/icons/LogoIcon.vue";

const userStore = useUserStore();
const themeStore = useThemesStore();
let isMenuVisible = ref(false);

function closeDropdown() {
	isMenuVisible.value = false;
}

function toggleDropdown() {
	isMenuVisible.value = !isMenuVisible.value;
}
</script>

<template>
	<header class="header-wrapper">
		<div class="page-positioning">
			<div class="header-content">
				<div
					:class="[
						userStore.username.length > 0
							? 'header-info'
							: 'header-info--loggedOut',
					]">
					<div class="header-title">
						<LogoIcon></LogoIcon>
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
				<div style="display: flex; gap: 2rem">
					<span @click="themeStore.toggleTheme">
						<!-- <mdicon
							:name="
								themeStore.getTheme === 'light'
									? 'toggle-switch-off-outline'
									: 'toggle-switch-outline'
							"
							size="40" /> -->
					</span>
					<div v-if="userStore.isLoggedIn">
						<div class="header-user">
							<img
								class="user-avatar"
								src="/user-pic.png"
								alt="user avatar" />
							<div>
								<mdicon
									v-if="!isMenuVisible"
									@click="toggleDropdown"
									name="triangle-down-outline"
									class="svg-icon"
									size="15" />
								<mdicon
									v-if="isMenuVisible"
									@click="toggleDropdown"
									name="triangle-outline"
									size="15" />
							</div>
							<UserMenu
								:class="isMenuVisible ? 'dropdown-menu show' : 'dropdown-menu'"
								@close="closeDropdown"
								:show="isMenuVisible" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<style scoped>
.header-wrapper {
	position: relative;
	box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 8px;
}

.page-positioning {
	margin: 0 auto;
}

.dropdown-menu {
	position: absolute;
	width: 350px;
	top: 100%;
	right: -10px;
	cursor: not-allowed;
	pointer-events: none;
	z-index: 1;
	opacity: 0;
	transition-property: top, right, opacity;
	transition-duration: 0.2s;
	transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.show {
	top: calc(100% + 10px);
	right: 0px;
	z-index: 2;
	pointer-events: auto;
	cursor: pointer;
	opacity: 1;
	transition-property: top, right, opacity;
	transition-duration: 0.2s;
	transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.header-content {
	position: relative;
	z-index: 2;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 16px 0px 12px 0px;
}
.header-info,
.header-user {
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 15px;
}
.header-info {
	flex-wrap: wrap;
}

.header-info--loggedOut {
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: end;
	gap: 15px;
	justify-content: space-between;
}
.header-title {
	display: flex;
	gap: .5rem;
	font-weight: 600;
	font-size: 24px;
}

img {
	width: 50px;
	height: 50px;
}

.user-avatar {
	display: none;
}
.user-name {
	font-weight: 600;
}
.user-title {
	color: #a9aebf;
}

.nav-link {
	margin-right: 10px;
	font-size: 18px;
	text-decoration: none;
	color: #797d8b;
}
.active-link {
	font-weight: 600;
	color: var(--primary-accent);
	text-decoration: underline;
}

@media (min-width: 560px) {
	.user-avatar {
		display: inline-block;
		border-radius: 50%;
		height: 28px;
		width: 28px;
	}
}
</style>
