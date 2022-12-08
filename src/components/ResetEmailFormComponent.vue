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
            Which E-Mail should we send the password reset link to?
          </h1>
          <form @submit.prevent="">
            <div>
              <label for="email" class="form-label">Your E-Mail</label>
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
              <div class="text-color-success">E-Mail sent successfully.</div>
            </div>
            <div v-else class="my-5"></div>
            <button @click="onSubmit" class="form-button">
              Send Reset E-Mail
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
