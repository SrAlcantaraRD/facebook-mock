import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import PrimeVue from "primevue/config";
import InputText from "primevue/inputtext";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/lara-light-teal/theme.css";
import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// const app = createApp(App);

// app.config.globalProperties.$appState = reactive({
//   theme: "lara-light-teal",
//   darkTheme: true,
// });

createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue, { ripple: true, inputStyle: "outlined" })
  .component("InputText", InputText)
  .mount("#app");
