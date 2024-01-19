<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import BaseButton from "../components/BaseButton.vue";
import LogoIcon from "./icons/LogoIcon.vue";
import FacebookIcon from "./icons/FacebookIcon.vue";
import GoogleIcon from "./icons/GoogleIcon.vue";
import CloseIcon from "./icons/CloseIcon.vue";

const userStore = useUserStore();
const username = ref("");
const password = ref("");

const alertVisibility = ref(localStorage.getItem("alert"));
function handleAlert() {
	localStorage.setItem("alert", "hidden");
	alertVisibility.value = localStorage.getItem("alert");
}

function autofill() {
	username.value = "ivona";
	password.value = "password";
}

function handleSubmit() {
	const user = username.value;

	userStore.setLogIn(true);
	userStore.setCurrentUser(user);
	localStorage.setItem("user", user);
}
</script>

<template>
	<div class="container">
		<div
			class="alert-message"
			v-if="!alertVisibility">
			<div class="message">
				<BaseButton
					class="primary bold"
					@click="autofill"
					>Autofill credentials</BaseButton
				>
				<span
					>Username: <strong>ivona</strong> | Password:
					<strong>password</strong>
				</span>
			</div>
			<CloseIcon
				@click="handleAlert"
				class="icon-smaller closeBtn"></CloseIcon>
		</div>
		<div class="center">
			<div class="login-wrapper">
				<header class="header">
					<LogoIcon class="logo"></LogoIcon>
					<span>Dash</span>
				</header>
				<div class="login-buttons">
					<BaseButton class="secondary">
						<GoogleIcon class="icon-small" />
						Sign in with Google</BaseButton
					>
					<BaseButton class="secondary">
						<FacebookIcon class="icon-small" />
						Sign in with Facebook</BaseButton
					>
				</div>
				<div class="separator">
					<span>or sign in with</span>
				</div>
				<form
					autocomplete="off"
					class="login-form"
					@submit.prevent="handleSubmit">
					<div class="name-group">
						<label
							for="name"
							class="login-label"
							>Username:</label
						>
						<input
							required
							pattern="ivona"
							type="text"
							id="name"
							v-model="username"
							class="login-input" />
						<span
							v-if="error"
							class="login-error">
							{{ error }}
						</span>
					</div>
					<div class="password-group">
						<label
							for="password"
							class="login-label"
							>Password:</label
						>
						<input
							required
							pattern="password"
							id="password"
							type="password"
							v-model="password"
							class="login-input" />
						<span
							v-if="error"
							class="login-error">
							{{ error }}
						</span>
					</div>
					<div class="style-wrapper">
						<div class="check">
							<input
								type="checkbox"
								name="rememberDevice"
								id="rememberDevice" />
							<label for="rememberDevice"> Remember this device </label>
						</div>
						<span class="primaryColor bold"> Forgot Password?</span>
					</div>
					<BaseButton
						type="submit"
						class="primary">
						Log in
					</BaseButton>
				</form>
			</div>
		</div>
	</div>
</template>

<style scoped>
/* input:invalid {
	outline: 1px solid red;
} */
.container {
	display: flex;
	flex-direction: column;
	min-height: 100svh;
}

.center {
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f0f2fd;
	background: radial-gradient(
			rgb(210, 241, 223),
			rgb(211, 215, 250),
			rgb(186, 216, 244)
		)
		0% 0%/400% 400%;
	flex: 1;
}

.login-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;
	padding: 2rem;
	box-shadow: #919eab4d 0 0 2px, #919eab1f 0 12px 24px -4px;
	border-radius: 7px;
	width: 100%;
	max-width: 480px;
	background-color: white;
	margin: 2rem;
}

.header {
	display: flex;
	gap: 0.5rem;
	font-weight: 600;
	font-size: 24px;
}

.login-buttons {
	display: flex;
	flex-flow: row wrap;
	align-items: center;
	justify-content: center;
	gap: 1rem;

	.secondary {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		justify-content: center;
	}
}

.separator {
	position: relative;
	text-align: center;
	width: 100%;
}

.separator::before {
	content: "";
	position: absolute;
	left: 0;
	width: 100px;
	top: 50%;
	height: 1px;
	background: #e5eaef;
}

.separator::after {
	content: "";
	position: absolute;
	right: 0;
	width: 100px;
	top: 50%;
	height: 1px;
	background: #e5eaef;
}

.logo {
	color: #49beff;
	height: 2rem;
	width: 2rem;
}

.login-info {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;

	h1 {
		margin: 2rem 0 0 0;
	}

	span {
		color: rgb(139, 139, 139);
	}
}

.login-form {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	width: 100%;
	font-size: 0.9rem;

	.login-error {
		text-align: end;
		color: #fa896b;
	}
}

.login-label {
	font-weight: 600;
}

input[type="text"],
input[type="password"] {
	width: 100%;
	padding-inline: 10px;
}

input[type="checkbox"] {
	appearance: none;
	-webkit-appearance: none;
	display: flex;
	align-content: center;
	justify-content: center;
	height: 19px;
	width: 19px;
	border: 0.1rem solid #dee2e7;
	border-radius: 3px;
}

input[type="checkbox"]::before {
	content: "";
	width: 1rem;
	height: 1rem;
	clip-path: polygon(
		20% 0%,
		0% 20%,
		30% 50%,
		0% 80%,
		20% 100%,
		50% 70%,
		80% 100%,
		100% 80%,
		70% 50%,
		100% 20%,
		80% 0%,
		50% 30%
	);
	transform: scale(0);
	background-color: var(--primary-accent);
}

input[type="checkbox"]:checked::before {
	transform: scale(1);
}

.name-group,
.password-group {
	display: flex;
	flex-direction: column;
	gap: 0.7rem;
}

.style-wrapper {
	display: flex;
	flex-flow: row wrap;
	gap: 0.8rem;
	align-items: center;
	justify-content: space-between;
}

.check {
	display: flex;
	gap: 0.8rem;

	label {
		font-weight: normal;
	}
}

.alert-message {
	background-color: #fa896b;
	color: white;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	padding-inline: 1.5rem;
	padding-block: 0.8rem;

}
.message {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 1rem;
}

.closeBtn {
	cursor: pointer;
	flex-shrink: 0;
}

@media (max-width: 553px) {
	.secondary {
		width: 100%;
	}

	.separator::before,
	.separator::after {
		width: 20%;
	}

	.message {
		span {
			order: 1;
		}
		button {
			order: 2;
		}
	}
}
</style>
