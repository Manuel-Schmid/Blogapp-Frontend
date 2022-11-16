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
      class="border p-2 w-full dark:border-slate-600 dark:bg-slate-600 mt-4 mb-2 rounded-lg"
      v-model="oldPassword"
      type="password"
      placeholder="Old password"
    />
    <input
      class="border p-2 w-full dark:border-slate-600 dark:bg-slate-600 mb-2 rounded-lg"
      v-model="newPassword1"
      type="password"
      placeholder="New password"
    />
    <input
      class="border p-2 w-full dark:border-slate-600 dark:bg-slate-600 rounded-lg"
      v-model="newPassword2"
      type="password"
      placeholder="Confirm new password"
    />
    <div class="my-1" v-if="passwordChangeError">
      <div class="text-red-600">{{ passwordChangeError }}</div>
    </div>
    <button
      @click="onSubmit"
      class="py-2 px-8 mt-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-600 hover:dark:bg-slate-700"
    >
      Save
    </button>
  </div>
</template>

<style scoped></style>
