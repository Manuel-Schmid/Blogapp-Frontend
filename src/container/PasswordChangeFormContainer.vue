<script lang="ts">
import PasswordChangeFormComponent from "../components/PasswordChangeFormComponent.vue";
import { useAuthStore } from "../store/auth";
import { ref } from "vue";
export default {
  name: "PasswordChangeFormContainer",
  components: { PasswordChangeFormComponent },
  emits: ["togglePasswordChangeForm"],

  setup(props: {}, { emit }: any) {
    let passwordChangeError = ref("");

    const changePassword = async (
      oldPassword: string,
      newPassword1: string,
      newPassword2: string
    ) => {
      const passwordChangeInput = {
        oldPassword: oldPassword,
        newPassword1: newPassword1,
        newPassword2: newPassword2,
      };

      const success = await useAuthStore().changePassword(passwordChangeInput);
      if (success) {
        emit("togglePasswordChangeForm");
      } else {
        passwordChangeError.value = "An error occurred";
      }
    };

    return { passwordChangeError, changePassword };
  },
};
</script>

<template>
  <PasswordChangeFormComponent
    :passwordChangeError="passwordChangeError"
    @change-password="changePassword"
  ></PasswordChangeFormComponent>
</template>
