import { createRouter, createWebHistory } from "vue-router";
import ReportView from "../views/ReportView.vue";
import CustomersView from "../views/CustomersView.vue";
import UserView from "../views/UserView.vue";
import SingleCustomerView from "../views/SingleCustomerView.vue";
import { useUserStore } from "../stores/user";

const routes = [
	{
		path: "/",
		name: "home",
		component: ReportView,
	},
	{
		path: "/customers",
		name: "customers",
		component: CustomersView,
	},
	{
		name: "SingleCustomerView",
		path: "/customer/:id",
		component: SingleCustomerView,
	},
	{
		path: "/:username",
		name: "UserView",
		component: UserView,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	const userStore = useUserStore();
	const loggedIn = userStore.getLogInStatus;

	if (
		(to.path === "/customers" || to.name === "SingleCustomerView") &&
		!loggedIn
	) {
		next("/");
	} else {
		next();
	}
});

export default router;
