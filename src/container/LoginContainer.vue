<script lang="ts">
import LoginComponent from "../components/LoginComponent.vue";
import { useAuthStore } from "../store/auth";
import { useRoute } from "vue-router";
import router from "../router/router";
import { ref } from "vue";

export default {
  name: "LoginContainer",
  components: { LoginComponent },

  setup() {
    const authStore = useAuthStore();
    const route = useRoute();
    const loginError = ref("");

    const submitLogin = async (username: string, password: string) => {
      const loginResult = await authStore.fetchRefreshToken(username, password);
      if (loginResult === true) await router.push({ name: "posts" });
      else loginError.value = loginResult;
    };
    return { route, loginError, submitLogin };
  },
};
</script>

<template>
  <LoginComponent
    :verified-query="route.query.verified"
    :login-error="loginError"
    @submit-login="submitLogin"
  ></LoginComponent>
</template>
