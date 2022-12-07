import { createApp, provide, h } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import App from "./App.vue";
import router from "./router/router";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "./api/client";
import "./global.css";
import * as en from "./i18n/en.json";
import * as de from "./i18n/de.json";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPlus,
  faMinus,
  faThumbsUp,
  faComment,
  faUser,
  faArrowRight,
  faArrowLeft,
  faTrash,
  faXmark,
  faCheck,
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleXmark,
  faPenToSquare,
  faSquarePlus,
  faClock,
  faCircleCheck,
} from "@fortawesome/free-regular-svg-icons";
import { createI18n } from "vue-i18n";

library.add(
  faPlus,
  faMinus,
  faThumbsUp,
  faComment,
  faUser,
  faArrowRight,
  faArrowLeft,
  faTrash,
  faXmark,
  faCheck,
  faCircleXmark,
  faPenToSquare,
  faSquarePlus,
  faClock,
  faCircleCheck,
  faSort,
  faSortUp,
  faSortDown
);

const messages = {
  ...en,
  ...de,
};

const i18n = createI18n({
  locale: "de",
  fallbackLocale: "en",
  messages,
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
}).component("font-awesome-icon", FontAwesomeIcon);
const pinia = createPinia();
pinia.use(piniaPersist);

app.use(router);
app.use(pinia);

app.use(i18n);
app.mount("#app");
