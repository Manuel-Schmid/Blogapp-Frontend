<script lang="ts">
import { ref } from "vue";

export default {
  name: "LoginComponent",
  props: ["verifiedQuery"],

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
        Account verification successful
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
        Account verification failed
        <router-link :to="{ name: 'login' }">
          <font-awesome-icon
            icon="fa-regular fa-circle-xmark"
            class="clickable-icon"
          />
        </router-link>
      </div>
      <div class="form-wrapper">
        <div class="form-layout">
          <h1 class="form-title">Sign in to your account</h1>
          <form class="form-inner-spacing" @submit.prevent="">
            <div>
              <label for="username" class="form-label">Your username</label>
              <input
                type="text"
                name="username"
                v-model="username"
                id="username"
                class="form-input"
                placeholder="Username"
                required=""
              />
            </div>
            <div>
              <label for="password" class="form-label">Password</label>
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
                Forgot password?
              </router-link>
            </div>
            <button @click="onSubmit" class="form-button">Sign in</button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <router-link
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                :to="{ name: 'registration' }"
                >Sign up</router-link
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
