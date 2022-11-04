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
    const alreadyVerified = ref(false);
    const registrationComponentRef = ref();

    const submitRegistration = async (
      email: string,
      username: string,
      password1: string,
      password2: string
    ) => {
      const userRegistrationInput = {
        email,
        username,
        password1,
        password2,
      };

      signupSuccess.value = await authStore.registerUser(userRegistrationInput);
      if (signupSuccess.value) {
        console.log(registrationComponentRef.value);
        await registrationComponentRef.value.clearInputs();
      }
    };

    const resendActivationEmail = async (usedEmail: string) => {
      const responseErrors = await authStore.resendActivationEmail(usedEmail);
      if (responseErrors === null) {
        signupSuccess.value = true;
      } else {
        alreadyVerified.value =
          responseErrors.email[0].code === "already_verified";
      }
    };

    return {
      signupSuccess,
      alreadyVerified,
      submitRegistration,
      resendActivationEmail,
    };
  },
};
</script>

<template>
  <RegistrationComponent
    ref="registrationComponentRef"
    :signup-success="signupSuccess"
    :already-verified="alreadyVerified"
    @submit-registration="submitRegistration"
    @resend-activation-email="resendActivationEmail"
  ></RegistrationComponent>
</template>
