<script lang="ts">
import { ref } from "vue";

export default {
  name: "ResetEmailFormComponent",
  props: ["emailSentSuccessfully"],

  setup(props: {}, { emit }: any) {
    const emailInput = ref("");

    const onSubmit = () => {
      emit("sendEmail", emailInput.value);
    };

    return { emailInput, onSubmit };
  },
};
</script>

<template>
  <div class="site-container">
    <div class="flex-container-centered">
      <div class="form-wrapper">
        <div class="form-layout">
          <h1 class="form-title">
            {{ this.$t("components.password-reset-email.title") }}
          </h1>
          <form @submit.prevent="">
            <div>
              <label for="email" class="form-label">{{
                this.$t("shared.your-email")
              }}</label>
              <input
                type="email"
                name="email"
                v-model="emailInput"
                id="email"
                class="form-input"
                placeholder="john.doe@example.com"
                required=""
              />
            </div>
            <div v-if="emailSentSuccessfully" class="mt-1 mb-3">
              <div class="text-color-success">
                {{ this.$t("components.password-reset-email.email-success") }}
              </div>
            </div>
            <div v-else class="my-5"></div>
            <button @click="onSubmit" class="form-button">
              {{ this.$t("components.password-reset-email.send-reset-email") }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
