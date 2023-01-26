<script lang="ts">
import NavbarComponent from "../components/NavbarComponent.vue";
import { useAuthStore } from "../store/auth";
import { useRoute } from "vue-router";
import { updateTheme } from "../helper/layout";

export default {
  name: "NavbarContainer",
  components: { NavbarComponent },

  setup() {
    const authStore = useAuthStore();
    const route = useRoute();

    const setTheme = (darkThemeActive: boolean) => {
      if (darkThemeActive) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    const toggleDarkMode = async () => {
      if (authStore.user) {
        const userProfileInput = authStore.user.profile;
        userProfileInput.darkThemeActive = !userProfileInput.darkThemeActive;
        setTheme(userProfileInput.darkThemeActive);
        await authStore.updateUserProfile(userProfileInput);
      }
    };
    return { route, authStore, toggleDarkMode };
  },

  mounted() {
    updateTheme();
  },
};
</script>

<template>
  <NavbarComponent
    :is-dark-mode="!!authStore.user?.profile.darkThemeActive"
    :route-name="route.name"
    :user="authStore.user"
    @toggle-dark-mode="toggleDarkMode"
  ></NavbarComponent>
</template>
