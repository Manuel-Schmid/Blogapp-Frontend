<script lang="ts">
import EmailChangeFormComponent from "../components/EmailChangeFormComponent.vue";
import { useAuthStore } from "../store/auth";
import { useRoute } from "vue-router";
import { Ref, ref } from "vue";

export default {
  name: "EmailChangeFormContainer",
  components: { EmailChangeFormComponent },

  setup() {
    const authStore = useAuthStore();
    const route = useRoute();
    const emailChangeSuccess: Ref = ref(undefined);

    const emailChange = async (newEmail1: string, newEmail2: string) => {
      console.log(newEmail1, newEmail2);
      if (newEmail1 && newEmail2) {
        const emailChangeInput = {
          newEmail1: newEmail1,
          newEmail2: newEmail2,
          token: route.params.token as string,
        };
        emailChangeSuccess.value = await authStore.changeEmail(
          emailChangeInput
        );
      }
    };

    return { emailChange };
  },
};
</script>

<template>
  <EmailChangeFormComponent
    @email-change="emailChange"
  ></EmailChangeFormComponent>
</template>
