import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import PrimeVue from "primevue/config";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/lara-light-teal/theme.css";
import { createApp } from "vue";
import App from "@/App.vue";
import "@/registerServiceWorker";
import router from "@/router";
import { store } from "@/store";

createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue, { ripple: true, inputStyle: "outlined" })
  .mount("#app");
