<script lang="ts">
import { ref } from "vue";

export default {
  name: "PasswordChangeFormComponent",
  props: ["passwordChangeError"],

  setup(props: {}, { emit }: any) {
    let oldPassword = ref("");
    let newPassword1 = ref("");
    let newPassword2 = ref("");

    const onSubmit = () => {
      emit(
        "changePassword",
        oldPassword.value,
        newPassword1.value,
        newPassword2.value
      );
    };

    return {
      oldPassword,
      newPassword1,
      newPassword2,
      onSubmit,
    };
  },
};
</script>

<template>
  <div class="text-right w-full mb-4 text-sm dark:text-white">
    <input
      class="pw-change-form-input mb-2 mt-4"
      v-model="oldPassword"
      type="password"
      :placeholder="
        this.$t('components.password-change-form.old-password-placeholder')
      "
    />
    <input
      class="pw-change-form-input mb-2"
      v-model="newPassword1"
      type="password"
      :placeholder="this.$t('shared.new-password')"
    />
    <input
      class="pw-change-form-input"
      v-model="newPassword2"
      type="password"
      :placeholder="this.$t('shared.new-password-confirm')"
    />
    <div class="my-1" v-if="passwordChangeError">
      <div class="text-color-error">{{ passwordChangeError }}</div>
    </div>
    <button
      @click="onSubmit"
      class="py-2 px-8 mt-2 rounded-lg button-bg-light-2 dark:button-bg-dark"
    >
      {{ this.$t("shared.save") }}
    </button>
  </div>
</template>

<style scoped>
.pw-change-form-input {
  @apply border p-2 w-full dark:border-slate-600 dark:bg-slate-600 rounded-lg;
}
</style>
