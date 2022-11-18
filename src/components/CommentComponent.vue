<script lang="ts">
import { formatFullname } from "../helper/helper";

export default {
  name: "CommentComponent",
  props: ["comment", "isOwnComment"],

  setup(props: {}, { emit }: any) {
    const onDelete = () => {
      emit("deleteComment");
    };
    return { formatFullname, onDelete };
  },
};
</script>

<template>
  <div v-if="isOwnComment" class="comment-field bg-3">
    <div class="text-lg w-full">
      <span class="font-bold">
        {{ comment.title }}
      </span>
      <span class="float-right pr-1.5 pt-0.5 cursor-pointer" @click="onDelete">
        <font-awesome-icon icon="fa-solid fa-trash" class="dark:text-white" />
      </span>
    </div>
    <p class="py-1">{{ comment.text }}</p>
    <p class="text-right px-3">
      {{ formatFullname(comment.owner.firstName, comment.owner.lastName) }}
    </p>
  </div>
  <div v-else class="comment-field bg-1">
    <p class="font-bold text-lg pt-0.5">{{ comment.title }}</p>
    <p class="py-1">{{ comment.text }}</p>
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
