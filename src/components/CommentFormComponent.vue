<script lang="ts">
import { ref } from "vue";

export default {
  name: "CommentFormComponent",

  setup() {
    let title = ref("");
    let text = ref("");

    return { title, text };
  },
};
</script>

<template>
  <div class="text-left w-full mb-4">
    <input
      class="border p-2 w-full dark:border-slate-600 dark:bg-slate-600"
      v-model="title"
      placeholder="Title"
    />
    <textarea
      class="border w-full p-2 h-36 mt-3 dark:border-slate-600 dark:bg-slate-600"
      v-model="text"
      placeholder="Text"
    />
    <button
      @click="$emit('saveComment', title, text)"
      class="py-2 px-8 mt-2 rounded-lg float-right bg-slate-100 hover:bg-slate-200 dark:bg-slate-600 hover:dark:bg-slate-700"
    >
      Save
    </button>
  </div>
</template>

<style scoped></style>
