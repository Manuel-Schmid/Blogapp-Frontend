<script lang="ts">
import LoginComponent from "../components/LoginComponent.vue";
import { useAuthStore } from "../store/auth";
import { useRoute } from "vue-router";

export default {
  name: "LoginContainer",
  components: { LoginComponent },

  setup() {
    const authStore = useAuthStore();
    const route = useRoute();
    const submitLogin = (username: string, password: string) => {
      authStore.fetchRefreshToken(username, password);
    };
    return { route, submitLogin };
  },
};
</script>

<template>
  <LoginComponent
    :verified-query="route.query.verified"
    @submit-login="submitLogin"
  ></LoginComponent>
</template>
