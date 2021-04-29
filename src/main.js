import { createApp } from "vue";
import Maska from "maska";
import App from "./App.vue";
import "./assets/styles/main.scss";

const app = createApp(App);

app.use(Maska);

app.mount("#app");
