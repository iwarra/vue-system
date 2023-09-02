import { createRouter, createWebHistory } from "vue-router";
import ReportView from "../views/ReportView.vue";
import CustomersView from "../views/CustomersView.vue";
import SingleCustomerView from "../views/SingleCustomerView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: ReportView
  },
  {
    path: "/customers",
    name: "customers",
    component: CustomersView
  },
  {
    path: "/customer/:id",
    name: "SingleCustomerView",
    component: SingleCustomerView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;