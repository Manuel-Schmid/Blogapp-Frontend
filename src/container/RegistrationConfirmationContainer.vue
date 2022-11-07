<script lang="ts">
import RegistrationConfirmationComponent from "../components/RegistrationConfirmationComponent.vue";
import { useAuthStore } from "../store/auth";
import { ref } from "vue";

export default {
  name: "RegistrationConfirmationContainer",
  components: { RegistrationConfirmationComponent },
  props: ["usedEmail"],

  setup() {
    const authStore = useAuthStore();
    const resendSuccess: any = ref(undefined);
    const alreadyVerified = ref(false);

    const resendActivationEmail = async (usedEmail: string) => {
      const responseErrors = await authStore.resendActivationEmail(usedEmail);
      if (responseErrors === null) {
        resendSuccess.value = true;
      } else {
        alreadyVerified.value =
          responseErrors.email[0].code === "already_verified";
      }
    };

    return { resendSuccess, alreadyVerified, resendActivationEmail };
  },
};
</script>

<template>
  <RegistrationConfirmationComponent
    @resend-activation-email="resendActivationEmail"
    :used-email="usedEmail"
    :resend-success="resendSuccess"
    :already-verified="alreadyVerified"
  ></RegistrationConfirmationComponent>
</template>
