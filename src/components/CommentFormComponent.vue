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
      class="input-bordered p-2 w-full"
      v-model="title"
      placeholder="Title"
    />
    <textarea
      class="input-bordered p-2 w-full h-36 mt-3"
      v-model="text"
      placeholder="Text"
    />
    <button
      @click="$emit('saveComment', title, text)"
      class="form-button w-32 float-right"
    >
      Save
    </button>
  </div>
</template>

<style scoped></style>
