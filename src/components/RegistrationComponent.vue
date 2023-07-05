<script lang="ts">
import { ref } from "vue";
import RegistrationConfirmationContainer from "../container/RegistrationConfirmationContainer.vue";

export default {
  name: "RegistrationComponent",
  components: { RegistrationConfirmationContainer },
  props: ["usedEmail", "signupSuccess"],

  setup(props: {}, { emit }: any) {
    const email = ref("");
    const username = ref("");
    const password1 = ref("");
    const password2 = ref("");
    const avatar = ref(undefined);

    const onFileChange = (e: { target: { files: any[] } }) => {
      if (e.target.files.length > 0) {
        avatar.value = e.target.files[0];
      }
    };

    const onSubmit = () => {
      emit(
        "submitRegistration",
        email.value,
        username.value,
        password1.value,
        password2.value,
        avatar.value
      );
    };

    return {
      email,
      username,
      password1,
      password2,
      avatar,
      onFileChange,
      onSubmit,
    };
  },
};
</script>

<template>
  <div v-if="signupSuccess">
    <RegistrationConfirmationContainer
      :used-email="usedEmail"
    ></RegistrationConfirmationContainer>
  </div>
  <div v-else class="site-container">
    <div class="flex-container-centered">
      <div class="form-wrapper">
        <div class="form-layout">
          <h1 class="form-title">
            {{ this.$t("components.registration.title") }}
          </h1>
          <form ref="signupForm" class="form-inner-spacing" @submit.prevent="">
            <div>
              <label for="email" class="form-label">{{
                this.$t("shared.your-email")
              }}</label>
              <input
                type="email"
                name="email"
                v-model="email"
                id="email"
                class="form-input"
                placeholder="john.doe@example.com"
                required=""
              />
            </div>
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
                name="password1"
                v-model="password1"
                id="password1"
                placeholder="••••••••"
                class="form-input"
                required=""
              />
            </div>
            <div>
              <label for="password" class="form-label">{{
                this.$t("shared.password-confirm")
              }}</label>
              <input
                type="password"
                name="password2"
                v-model="password2"
                id="password2"
                placeholder="••••••••"
                class="form-input"
                required=""
              />
            </div>
            <div>
              <label for="avatar" class="form-label">{{
                this.$t("components.registration.avatar")
              }}</label>
              <input
                type="file"
                name="avatar"
                id="avatar"
                @change="onFileChange"
                class="form-input"
                accept="image/png, image/jpg, image/jpeg"
                required
              />
            </div>
            <button @click="onSubmit" class="form-button">
              {{ this.$t("shared.sign-up") }}
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              {{ this.$t("components.registration.existing-account") }}
              <router-link
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                :to="{ name: 'login' }"
                >{{ this.$t("shared.sign-in") }}</router-link
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
