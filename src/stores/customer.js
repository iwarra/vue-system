import { defineStore } from "pinia";

export const useCustomerStore = defineStore({
  id: "customer",
  state: () => ({
    customer: null
  }),
  actions: {
    setCustomer(data) {
      this.customer = data;
    },
    getCustomer() {
      return this.customer;
    }
  }
});