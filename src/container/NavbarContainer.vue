<script lang="ts">
import NavbarComponent from "../components/NavbarComponent.vue";
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
import { useRoute } from "vue-router";

export default {
  name: "NavbarContainer",
  components: { NavbarComponent },

  setup() {
    const isDarkMode = ref(localStorage.theme === "dark");
    const authStore = useAuthStore();

    const route = useRoute();

    const toggleDarkMode = () => {
      if (localStorage.theme === "light") {
        localStorage.theme = "dark";
        isDarkMode.value = true;
      } else {
        localStorage.theme = "light";
        isDarkMode.value = false;
      }
      updateTheme();
    };
    return { route, authStore, isDarkMode, toggleDarkMode };
  },

  mounted() {
    updateTheme();
  },
};

function updateTheme() {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
</script>

<template>
  <NavbarComponent
    :is-dark-mode="isDarkMode"
    :route-name="route.name"
    :user="authStore.user"
    @toggle-dark-mode="toggleDarkMode"
  ></NavbarComponent>
</template>
