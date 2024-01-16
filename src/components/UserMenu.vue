<script setup>
import { onUnmounted, onMounted } from "vue";
import { useThemesStore } from "../stores/themes";
import { useUserStore } from "../stores/user";
import BaseButton from "../components/BaseButton.vue";
import IconWrapper from "../components/IconWrapper.vue";
import InboxIcon from "../components/icons/InboxIcon.vue";
import UserIcon from "../components/icons/UserIcon.vue";
import ListIcon from "../components/icons/ListIcon.vue";
import MailIcon from "../components/icons/MailIcon.vue";

const emit = defineEmits(["close"]);
const themeStore = useThemesStore();
const userStore = useUserStore();
const username = userStore.getUsername;
const props = defineProps({
	show: Boolean,
});

function handleLogOut() {
	userStore.resetUsername();
	userStore.setLogIn(false);
	localStorage.removeItem("user");
	emit("close");
}

// add on click outside

function handleClosingEvent(e) {
	const parentSpan = e.target.closest("span");
	const parentLi = e.target.closest("li");
	const parentDiv = e.target.closest("div");
  console.log(e.target)

	if (parentSpan !== null && parentSpan.classList.contains("svg-icon")) {
		return;
	}

	if (parentLi !== null && parentLi.classList.contains("dropdown-item")) {
		return;
	}

	if (parentDiv !== null && parentDiv.classList.contains("user-container")) {
		return;
	}

	emit("close");
}

onMounted(() => {
	document.addEventListener("click", handleClosingEvent);
});

onUnmounted(() => {
	document.removeEventListener("click", handleClosingEvent);
});
</script>

<template>
	<div :class="[themeStore.getTheme === 'light' ? 'wrapper' : 'dark']">
		<div class="user-container">
			<img
				class="user-avatar"
				src="/user-pic.png"
				alt="user avatar" />
			<div class="user-info">
				<span class="bolder">{{ userStore.username }}</span>
				<span class="user-title">Guest</span>
				<div class="user-mail">
					<MailIcon></MailIcon>
					<span>info@company.com</span>
				</div>
			</div>
		</div>
		<hr />
		<menu class="dropdown-nav">
			<li>
				<router-link
					class="dropdown-item"
					:to="{
						name: 'UserView',
						params: { username },
					}">
					<IconWrapper class="icon-wrapper-larger">
						<UserIcon class="icon-smaller"></UserIcon>
					</IconWrapper>
					<div class="link-text">
						<span class="bolder">My profile</span>
						<span>Account settings</span>
					</div>
				</router-link>
			</li>
			<li class="dropdown-item">
				<IconWrapper class="icon-wrapper-larger">
					<InboxIcon class="icon-smaller"></InboxIcon>
				</IconWrapper>
				<div class="link-text">
					<span class="bolder">My inbox</span>
					<span>Message and email</span>
				</div>
			</li>
			<li class="dropdown-item">
				<IconWrapper class="icon-wrapper-larger">
					<ListIcon class="icon-smaller"></ListIcon>
				</IconWrapper>
				<div class="link-text">
					<span class="bolder">My tasks</span>
					<span>To-do and daily tasks</span>
				</div>
			</li>
		</menu>
		<BaseButton
			class="secondary"
			@click="handleLogOut()"
			>Log out</BaseButton
		>
	</div>
</template>

<style scoped>
.dark {
	background-color: var(--primary-dark);
	color: var(--primary-light);
	border-top: 0.5px solid var(--border-dark);
	box-shadow: rgba(0, 0, 0, 0.48) 0px 10px 20px,
		rgba(0, 0, 0, 0.23) -10px 6px 20px;
	padding: 2rem;
	display: flex;
	flex-direction: column;
	gap: 2rem;
}
.wrapper {
	background-color: var(--primary-light);
	box-shadow: #919eab4d 0 0 2px, #919eab1f 0 12px 24px -4px;
	border-radius: 4px;
	padding: 2rem;
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

hr {
	border: none;
	height: 1px;
	background-color: #e5eaef;
}

.user-container {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	flex-wrap: wrap;
	cursor: not-allowed;
	pointer-events: none;
}

.user-info {
	display: flex;
	flex-direction: column;
	font-size: 14px;
	gap: 0.2rem;
}

.user-avatar {
	width: 95px;
}

.user-mail {
	display: flex;
	flex-direction: row;
	gap: 0.3rem;
	align-items: center;
}

.icon-smaller {
	color: var(--primary-accent);
}

.dropdown-nav {
	list-style: none;
	display: flex;
	flex-direction: column;
	gap: 2rem;
	align-items: flex-start;
}

.dropdown-item {
	display: flex;
	flex-direction: row;
	gap: 1rem;
}

.bolder {
	font-weight: 600;
}

.link-text {
	display: flex;
	flex-direction: column;
	font-size: 14px;
	justify-content: space-around;
}

a {
	text-decoration: none;
	color: black;
}
.dropdown-link {
	display: flex;
	flex-direction: row;
	gap: 1rem;
	align-items: center;
	justify-content: flex-start;
	color: #5b6791b2;
	cursor: not-allowed;
	pointer-events: none;
}
</style>
