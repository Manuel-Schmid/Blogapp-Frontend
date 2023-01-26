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

    const toggleDarkMode = async () => {
      if (authStore.user) {
        const userProfileInput = authStore.user.profile;
        delete userProfileInput.__typename;
        userProfileInput.darkThemeActive = !userProfileInput.darkThemeActive;
        await authStore.updateUserProfile(userProfileInput);
        updateTheme();
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
