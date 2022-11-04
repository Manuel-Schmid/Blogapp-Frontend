<script lang="ts">
import { formatFullname } from "../helper/helper";

export default {
  name: "CommentComponent",
  props: ["comment", "isOwnComment"],

  setup() {
    return { formatFullname };
  },
};
</script>

<template>
  <div v-if="isOwnComment" class="comment-field bg-[#dce7f5] dark:bg-[#203757]">
    <div class="text-lg w-full">
      <span class="font-bold">
        {{ comment.title }}
      </span>
      <span
        class="float-right pr-1.5 pt-0.5 cursor-pointer"
        @click="$emit('deleteComment')"
      >
        <font-awesome-icon icon="fa-solid fa-trash" class="dark:text-white" />
      </span>
    </div>
    <p class="pt-1 pb-1">{{ comment.text }}</p>
    <p class="text-right px-3">
      {{ formatFullname(comment.owner.firstName, comment.owner.lastName) }}
    </p>
  </div>
  <div v-else class="comment-field bg-gray-100 dark:bg-slate-700">
    <p class="font-bold text-lg pt-0.5">{{ comment.title }}</p>
    <p class="pt-1 pb-1">{{ comment.text }}</p>
    <p class="text-right px-3">
      {{ formatFullname(comment.owner.firstName, comment.owner.lastName) }}
    </p>
  </div>
</template>

<style scoped>
.comment-field {
  @apply rounded-xl p-3 my-3 text-left w-3/4 m-auto;
}
</style>
