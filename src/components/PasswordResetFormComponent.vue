<script lang="ts">
import { ref } from "vue";

export default {
  name: "PasswordResetFormComponent",
  props: ["resetSuccess"],

  setup(props: {}, { emit }: any) {
    const newPassword1 = ref("");
    const newPassword2 = ref("");

    const onSubmit = () => {
      emit("resetPassword", newPassword1.value, newPassword2.value);
    };

    return { newPassword1, newPassword2, onSubmit };
  },
};
</script>

<template>
  <div class="site-container">
    <div class="flex-container-centered">
      <div class="form-wrapper">
        <div class="form-layout">
          <h1 class="form-title">
            {{ this.$t("components.password-reset-form.title") }}
          </h1>
          <form @submit.prevent="">
            <div>
              <label for="password" class="form-label">{{
                this.$t("shared.new-password")
              }}</label>
              <input
                type="password"
                name="password"
                v-model="newPassword1"
                id="password"
                placeholder="••••••••"
                class="form-input"
                required=""
              />
            </div>
            <div class="mt-3">
              <label for="password" class="form-label">{{
                this.$t("shared.new-password-confirm")
              }}</label>
              <input
                type="password"
                name="password"
                v-model="newPassword2"
                id="passwordConfirm"
                placeholder="••••••••"
                class="form-input"
                required=""
              />
            </div>
            <div v-if="resetSuccess" class="mt-1 mb-3">
              <div class="text-color-success">
                {{ this.$t("components.password-reset-form.reset-success") }}
              </div>
            </div>
            <div v-else-if="resetSuccess === false" class="mt-1 mb-3">
              <div class="text-color-error">
                {{ this.$t("components.password-reset-form.reset-fail") }}
              </div>
            </div>
            <div v-else class="my-7"></div>
            <button @click="onSubmit" class="form-button">
              {{ this.$t("components.password-reset-form.reset-password") }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
