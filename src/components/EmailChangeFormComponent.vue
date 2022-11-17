<script lang="ts">
import { ref } from "vue";

export default {
  name: "EmailChangeFormComponent",
  props: ["emailChangeSuccess"],

  setup(props: {}, { emit }: any) {
    const newEmail1 = ref("");
    const newEmail2 = ref("");

    const onSubmit = () => {
      emit("emailChange", newEmail1.value, newEmail2.value);
    };

    return { newEmail1, newEmail2, onSubmit };
  },
};
</script>

<template>
  <div class="site-container">
    <div class="flex-container-centered">
      <div class="form-wrapper">
        <div class="form-layout">
          <h1 class="form-title">Change your email address</h1>
          <form @submit.prevent="">
            <div>
              <label for="email" class="form-label">New email address</label>
              <input
                type="email"
                name="newEmail1"
                v-model="newEmail1"
                id="email"
                placeholder="john.doe@example.com"
                class="form-input"
                required=""
              />
            </div>
            <div class="mt-3">
              <label for="emailConfirm" class="form-label"
                >Confirm new email address</label
              >
              <input
                type="email"
                name="newEmail2"
                v-model="newEmail2"
                id="emailConfirm"
                placeholder="john.doe@example.com"
                class="form-input"
                required=""
              />
            </div>
            <div v-if="emailChangeSuccess" class="mt-1 mb-3">
              <div class="text-color-success">Email change successful.</div>
            </div>
            <div v-else-if="emailChangeSuccess === false" class="mt-1 mb-3">
              <div class="text-color-error">Email change failed.</div>
            </div>
            <div v-else class="my-7"></div>
            <button @click="onSubmit" class="form-button">Change Email</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
