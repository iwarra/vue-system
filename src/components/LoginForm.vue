<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const username = ref("");
const password = ref("");
const errorName = ref("");
const errorPassword = ref("");

function handleSubmit() {
	if (username.value.trim() === "") {
		errorName.value = "You need to enter your name!";
		ref.nameInput.focus();
		return;
	}
	if (password.value.trim() === "") {
		errorPassword.value = "You need to enter your password!";
		ref.passwordInput.focus();
		return;
	}

	const user = {
		username: username.value,
		password: password.value,
	};

	userStore.setLogIn(true);
	userStore.setCurrentUser(user.username);
	localStorage.setItem("user", JSON.stringify(user));

	username.value = "";
	password.value = "";
	errorName.value = "";
	errorPassword.value = "";
}
</script>

<template>
	<div class="container">
		<div class="login-wrapper">
			<div class="login-info">
				<h1>Please log in</h1>
			</div>
			<form
				class="login-form"
				@submit.prevent="handleSubmit">
				<label
					for="name"
					class="login-label"
					>Username:</label
				>
				<input
					type="text"
					id="name"
					v-model="username"
					ref="nameInput"
					class="login-input" />
				<span class="login-error"> {{ errorName }} </span>
				<label
					for="password"
					class="login-label"
					>Password:</label
				>
				<input
					id="password"
					type="password"
					v-model="password"
					ref="passwordInput"
					class="login-input" />
				<span class="login-error"> {{ errorPassword }} </span>
				<button
					type="submit"
					class="login-btn">
					Log in
				</button>
			</form>
			<div class="alert">
				<span>Enter any value to log in.</span>
			</div>
		</div>
	</div>
</template>

<style scoped>
.alert {
	text-align: center;
	background-color: rgb(251, 163, 130);
	padding: 1rem 2rem;
	border-radius: 8px;
	width: 300px;
}

.login-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;
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
	align-items: center;
	gap: 0.8em;
	width: 100%;

	.login-label {
		font-size: large;
	}

	.login-btn {
		border: 0.5px solid var(--border-light);
		padding: 0.3em 1.6em;
		border-radius: var(--borderRadius-large);
		font-size: large;
		box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.1);
	}

	.login-btn:hover {
		cursor: pointer;
	}
	.login-error {
		color: #f63d30f9;
	}
}

.login-input {
	border: 0.5px solid var(--border-light);
	border-radius: var(--borderRadius-small);
	height: 2.3em;
	padding-inline-start: 0.8em;
	min-width: 75%;
}

@media (min-width: 680px) {
	.login-input {
		min-width: 50%;
	}
}
</style>
