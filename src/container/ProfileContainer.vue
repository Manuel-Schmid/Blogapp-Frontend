<script lang="ts">
import ProfileComponent from "../components/ProfileComponent.vue";
import { useAuthStore } from "../store/auth";
import router from "../router/router";
import { ref } from "vue";
import { Language } from "../api/models";
import { updateLanguage } from "../helper/layout";

export default {
  name: "profileContainer",
  components: { ProfileComponent },

  setup() {
    const authStore = useAuthStore();
    const firstNameEditable = ref(false);
    const lastNameEditable = ref(false);
    const emailChangeEmailSent = ref(false);

    authStore.fetchAuthorRequestByUser();

    const logout = async () => {
      await authStore.logoutUser();
      await router.push({ name: "posts" });
    };

    const sendEmailChangeEmail = async (email: string) => {
      const success = await authStore.sendEmailChangeEmail(email);
      if (success) {
        emailChangeEmailSent.value = true;
      }
    };

    const updateAccount = async (firstName: string, lastName: string) => {
      if (firstName && lastName) {
        const updateAccountInput = {
          firstName,
          lastName,
        };

        const success = await authStore.updateAccount(updateAccountInput);
        if (success) {
          firstNameEditable.value = false;
          lastNameEditable.value = false;
        }
      }
    };

    const setLanguage = async (lang: Language) => {
      if (authStore.user) {
        const userProfileInput = authStore.user.profile;
        userProfileInput.language = lang;
        await authStore.updateUserProfile(userProfileInput);

        updateLanguage();
      }
    };

    return {
      firstNameEditable,
      lastNameEditable,
      emailChangeEmailSent,
      logout,
      sendEmailChangeEmail,
      updateAccount,
      setLanguage,
      authStore,
    };
  },
};
</script>

<template>
  <ProfileComponent
    :first-name-editable="firstNameEditable"
    :last-name-editable="lastNameEditable"
    :email-change-email-sent="emailChangeEmailSent"
    @logout="logout"
    @send-email-change-email="sendEmailChangeEmail"
    @update-account="updateAccount"
    @create-author-request="authStore.createAuthorRequest"
    @set-language="setLanguage"
    :user-data="authStore.user"
    :author-request="authStore.authorRequest"
  />
</template>
