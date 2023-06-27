<script lang="ts">
import RegistrationComponent from "../components/RegistrationComponent.vue";
import { useAuthStore } from "../store/auth";
import { ref } from "vue";

export default {
  name: "RegistrationContainer",
  components: { RegistrationComponent },

  setup() {
    const authStore = useAuthStore();
    const signupSuccess: any = ref(undefined);
    const usedEmail = ref("");

    const submitRegistration = async (
      email: string,
      username: string,
      password1: string,
      password2: string,
      avatar: any
    ) => {
      const userRegistrationInput = {
        email,
        username,
        password1,
        password2,
        avatar,
      };

      signupSuccess.value = await authStore.registerUser(userRegistrationInput);
      usedEmail.value = email;
    };

    return {
      usedEmail,
      signupSuccess,
      submitRegistration,
    };
  },
};
</script>

<template>
  <RegistrationComponent
    ref="registrationComponentRef"
    :used-email="usedEmail"
    :signup-success="signupSuccess"
    @submit-registration="submitRegistration"
  ></RegistrationComponent>
</template>
