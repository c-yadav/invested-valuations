import { createApp } from "vue";
import router from "./routers/index.ts";
import App from "./App.vue";
// import "./style.css";
import "./styles/main.css";

createApp(App).use(router).mount("#app");
