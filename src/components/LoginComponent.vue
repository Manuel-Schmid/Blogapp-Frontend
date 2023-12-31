<script lang="ts">
import { ref } from "vue";

export default {
  name: "LoginComponent",
  props: ["verifiedQuery", "loginError"],

  setup(props: { verifiedQuery: string }, { emit }: any) {
    const username = ref("");
    const password = ref("");
    const verifiedQueryExists = ref(props.verifiedQuery != undefined);
    const accountVerified = ref(props.verifiedQuery === "true");

    const onSubmit = () => {
      emit("submitLogin", username.value, password.value);
    };

    return {
      username,
      password,
      verifiedQueryExists,
      accountVerified,
      onSubmit,
    };
  },
};
</script>

<template>
  <div class="site-container">
    <div class="flex-container-centered flex-col">
      <div
        v-if="verifiedQueryExists && accountVerified"
        class="verification-popup bg-green-400 dark:bg-green-400"
      >
        {{ this.$t("components.login.verification.success") }}
        <router-link :to="{ name: 'login' }">
          <font-awesome-icon
            icon="fa-regular fa-circle-xmark"
            class="clickable-icon"
          />
        </router-link>
      </div>
      <div
        v-if="verifiedQueryExists && !accountVerified"
        class="verification-popup bg-red-400"
      >
        {{ this.$t("components.login.verification.error") }}
        <router-link :to="{ name: 'login' }">
          <font-awesome-icon
            icon="fa-regular fa-circle-xmark"
            class="clickable-icon"
          />
        </router-link>
      </div>
      <div class="form-wrapper">
        <div class="form-layout">
          <h1 class="form-title">{{ this.$t("components.login.title") }}</h1>
          <form class="form-inner-spacing" @submit.prevent="">
            <div>
              <label for="username" class="form-label">{{
                this.$t("shared.your-username")
              }}</label>
              <input
                type="text"
                name="username"
                v-model="username"
                id="username"
                class="form-input"
                :placeholder="this.$t('shared.username-placeholder')"
                required=""
              />
            </div>
            <div>
              <label for="password" class="form-label">{{
                this.$t("shared.password")
              }}</label>
              <input
                type="password"
                name="password"
                v-model="password"
                id="password"
                placeholder="••••••••"
                class="form-input"
                required=""
              />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start"></div>
              <router-link
                class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                :to="{ name: 'resetEmailForm' }"
              >
                {{ this.$t("components.login.forgot-password") }}
              </router-link>
            </div>
            <button @click="onSubmit" class="form-button">
              {{ this.$t("shared.sign-in") }}
            </button>
            <div v-if="loginError" class="text-color-error">
              <p v-if="loginError === 'INVALID_CREDENTIALS'">
                {{ this.$t("components.login.errors.invalid-credentials") }}
              </p>
              <p v-else-if="loginError === 'UNVERIFIED_USER'">
                {{ this.$t("components.login.errors.unverified-account") }}
              </p>
            </div>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              {{ this.$t("components.login.no-account") }}
              <router-link
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                :to="{ name: 'registration' }"
                >{{ this.$t("shared.sign-up") }}</router-link
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.clickable-icon {
  @apply cursor-pointer text-black ml-2;
}
.verification-popup {
  @apply text-xl py-4 px-5 rounded-lg bg-opacity-50 dark:bg-opacity-90 mb-5;
}
</style>
