<script setup>
import logo2 from "../assets/logo2.png";
</script>

<template>
	<footer>
		<div class="page-positioning">
			<div class="logo-wrapper">
				<img
					:src="logo2"
					alt="Company logo" />
				<span class="copyText">Copyright &copy; 2023 Hello Company</span>
			</div>
			<ul class="links-list">
				Contact:
				<li>
					<a
						class="link"
						href="mailto:hello@company.com"
						>hello@company.com</a
					>
				</li>
				<li>
					<a
						href="tel:+1234567890"
						class="link"
						>+12 345 67 890</a
					>
				</li>
			</ul>
		</div>
	</footer>
</template>

<style scoped>
footer {
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

	.page-positioning {
		margin: 0 auto;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		margin-block: 1.5rem;
	}

	.links-list {
		list-style: none;
	}
	.link {
		color: var(--primary-accent);
	}

	.copyText {
		visibility: hidden;
	}
}

@media (min-width: 560px) {
	footer {
		.copyText {
			visibility: visible;
			color: var(--secondary-accent);
		}
	}
}
</style>
