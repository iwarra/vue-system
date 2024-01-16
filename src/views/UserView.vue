<script setup>
import { useUserStore } from "../stores/user";
import Card from "../components/cards/Card.vue";
import TwoColumns from "../components/cards/TwoColumns.vue";
import UserIcon from "../components/icons/UserIcon.vue";
import DottedCircleIcon from "../components/icons/DottedCircleIcon.vue";
import CoinsIcon from "../components/icons/CoinsIcon.vue";
import BaseButton from "../components/BaseButton.vue";
const userStore = useUserStore();
const username = userStore.getUsername;
</script>

<template>
	<div class="container">
		<TwoColumns class="heading-card">
			<template #left-col>
				<Card>
					<template #main>
						<h2>Welcome back!</h2>
						<span>Here is your info, {{ username }}!</span>
					</template>
				</Card>
			</template>
			<template #right-col>
				<Card>
					<template #main>
						<img
							src="/user-info.png"
							alt="" />
					</template>
				</Card>
			</template>
		</TwoColumns>

		<Card class="profile-picture">
			<template #header>
				<h2>Profile picture</h2>
			</template>
			<template #main>
				<img
					src="/user-pic.png"
					alt="" />
				<div class="upload">
					<input
						type="file"
						accept="image/png, image/jpeg, image/gif"
						size="800000" />
					<span>Allowed JPG, GIF or PNG. Max size of 800K</span>
				</div>
			</template>
		</Card>
		<Card>
			<template #header><h2>Change password</h2></template>
			<template #main>
				<div>
					<label for="current">Current password</label>
					<input
						type="password"
						value="password" />
				</div>
				<div>
					<label for="new">New password</label>
					<input
						type="password"
						value="password2" />
				</div>
				<div>
					<label for="confirm">Confirm password</label>
					<input
						type="password"
						value="password2" />
				</div>
			</template>
		</Card>

		<div class="account-info">
			<Card style="background-color: #ecf2ff">
				<template #header>
					<DottedCircleIcon
						class="icon-larger"
						style="color: #a1a0ff" />
				</template>
				<template #main>
					<span>Member since</span>
					<strong>05/08/2020</strong>
				</template>
			</Card>
			<Card style="background-color: #fef5e5">
				<template #header>
					<CoinsIcon
						class="icon-larger"
						style="color: #ffae1f" />
				</template>
				<template #main>
					<span>Credits left</span>
					<strong>7</strong>
				</template>
			</Card>
			<Card style="background-color: #e8f7ff">
				<template #header>
					<UserIcon
						class="icon-larger"
						style="color: #49beff" />
				</template>
				<template #main>
					<span>Membership status</span>
					<strong>Premium</strong>
				</template>
			</Card>
		</div>

		<div class="buttons">
			<BaseButton class="primary">Save</BaseButton>
			<BaseButton class="cancel">Cancel</BaseButton>
		</div>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 2rem;
}
.container > .card {
	flex: 1 1 550px;
}

.profile-picture:deep(.main) {
	display: flex;
	flex-direction: column;
	gap: 2rem;
	align-items: center;

	img {
		height: 7rem;
	}
}

.upload {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;

	span {
		font-size: smaller;
	}
}

label {
	font-size: 0.9rem;
}

input[type="password"] {
	margin-block: 0.5rem;
	width: 100%;
}

.account-info .card:deep(.main) {
	text-align: center;
}
.account-info {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	width: 100%;

	& > .card {
		flex: 1 1 350px;
	}

	.card {
		align-items: center;
		justify-content: center;
		min-height: 10rem;

		span {
			font-size: 0.9rem;
			display: block;
		}

		strong {
			font-size: 1.3rem;
		}
	}
}

.buttons {
	display: flex;
	width: 100%;
	gap: 1rem;
	justify-content: flex-end;
}
</style>
