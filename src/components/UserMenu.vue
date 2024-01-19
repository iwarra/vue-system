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
const userStore = useUserStore();
const username = userStore.getUsername;

function handleLogOut() {
	userStore.resetUsername();
	userStore.setLogIn(false);
	localStorage.clear();
	emit("close");
}

function handleClosingEvent(e) {
	const headerUser = document.querySelector(".header-user");

	if (headerUser.contains(e.target)) return;

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
	<div class="wrapper">
		<div class="user-container">
			<img
				class="user-picture"
				src="/user-pic.png"
				alt="user avatar" />
			<div class="user-info">
				<span class="bold">{{ userStore.username }}</span>
				<span class="user-title">Software engineer</span>
				<div class="user-mail">
					<MailIcon></MailIcon>
					<span>{{ userStore.username }}@dash.com</span>
				</div>
			</div>
		</div>
		<hr />
		<menu class="dropdown-nav">
			<li>
				<div
					class="dropdown-item"
					@click="
						$router.push({
							name: 'UserView',
							params: { username },
						})
					">
					<IconWrapper class="icon-wrapper-larger">
						<UserIcon class="icon-smaller"></UserIcon>
					</IconWrapper>
					<div class="link-text">
						<span class="bold">My profile</span>
						<span>Account settings</span>
					</div>
				</div>
			</li>
			<li class="dropdown-item">
				<IconWrapper class="icon-wrapper-larger">
					<InboxIcon class="icon-smaller"></InboxIcon>
				</IconWrapper>
				<div class="link-text">
					<span class="bold">My inbox</span>
					<span>Message and email</span>
				</div>
			</li>
			<li class="dropdown-item">
				<IconWrapper class="icon-wrapper-larger">
					<ListIcon class="icon-smaller"></ListIcon>
				</IconWrapper>
				<div class="link-text">
					<span class="bold">My tasks</span>
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
.wrapper {
	background-color: var(--primary-light);
	box-shadow: #919eab4d 0 0 2px, #919eab1f 0 12px 24px -4px;
	border-radius: 4px;
	padding: 2rem;
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

.user-container {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	flex-wrap: wrap;
	/* cursor: not-allowed;
	pointer-events: none; */
}

.user-info {
	display: flex;
	flex-direction: column;
	font-size: 14px;
	gap: 0.2rem;
}

hr {
	border: none;
	height: 1px;
	background-color: #e5eaef;
}

.user-picture {
	display: unset;
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

.icon-smaller {
	color: #64c7ff;
}

.icon-wrapper-larger {
	background-color: color-mix(in srgb, #64c7ff 15%, #ffffff5b);
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
	/* cursor: not-allowed;
	pointer-events: none; */
}

@media (max-width: 500px) {
	.user-picture {
		display: none;
	}

	.user-container {
		justify-content: flex-start;
	}
}
</style>
