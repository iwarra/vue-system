import { createRouter, createWebHistory } from "vue-router";
import ReportView from "../views/ReportView.vue";
const SingleCustomerView = () => import("../views/SingleCustomerView.vue");
const UserView = () => import("../views/UserView.vue");
const CustomersView = () => import("../views/CustomersView.vue");
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
		path: "/customers/:name",
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
