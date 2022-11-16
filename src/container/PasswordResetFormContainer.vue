<script lang="ts">
import PasswordResetFormComponent from "../components/PasswordResetFormComponent.vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { useAuthStore } from "../store/auth";

export default {
  name: "PasswordResetFormContainer",
  components: { PasswordResetFormComponent },

  setup() {
    const route = useRoute();
    const authStore = useAuthStore();
    const resetSuccess = ref(undefined);

    const resetPassword = async (
      newPassword1: string,
      newPassword2: string
    ) => {
      const passwordResetInput = {
        newPassword1: newPassword1,
        newPassword2: newPassword2,
        token: route.params.token as string,
      };

      resetSuccess.value = await authStore.resetPassword(passwordResetInput);
    };

    return { resetSuccess, resetPassword };
  },
};
</script>

<template>
  <PasswordResetFormComponent
    :reset-success="resetSuccess"
    @reset-password="resetPassword"
  ></PasswordResetFormComponent>
</template>
