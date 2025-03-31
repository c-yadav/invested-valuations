import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
// import Company from "../components/Company.vue";
import Companies from "../components/Companies.vue";

export default createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    // {
    //     path: "/companies",
    //     name: "Companies",
    //     component: Companies,
    // },
    {
      path: "/valuations/companies",
      name: "Valuations",
      component: Companies,
    },
  ],
});
