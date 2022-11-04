<script lang="ts">
import ResetEmailFormComponent from "../components/ResetEmailFormComponent.vue";
import { useAuthStore } from "../store/auth";
import { ref } from "vue";

export default {
  name: "ResetEmailFormContainer",
  components: { ResetEmailFormComponent },

  setup() {
    const emailSentSuccessfully = ref(false);

    const sendEmail = async (email: string) => {
      emailSentSuccessfully.value = await useAuthStore().sendResetPasswordEmail(
        email
      );
    };

    return { emailSentSuccessfully, sendEmail };
  },
};
</script>

<template>
  <ResetEmailFormComponent
    :email-sent-successfully="emailSentSuccessfully"
    @send-email="sendEmail"
  ></ResetEmailFormComponent>
</template>
