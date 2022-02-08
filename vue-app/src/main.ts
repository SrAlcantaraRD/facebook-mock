import App from "@/App.vue";
import "@/registerServiceWorker";
import router from "@/router";
import { store } from "@/store";

import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/lara-light-teal/theme.css";

import Button from "primevue/button";
import Calendar from "primevue/calendar";
import PrimeVue from "primevue/config";
import InputText from "primevue/inputtext";

import { createApp } from "vue";

createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue, { ripple: true, inputStyle: "outlined" })
  .component("Button", Button)
  .component("Calendar", Calendar)
  .component("InputText", InputText)

  .mount("#app");
