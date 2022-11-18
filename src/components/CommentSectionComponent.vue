<script lang="ts">
import CommentFormContainer from "../container/CommentFormContainer.vue";
import CommentContainer from "../container/CommentContainer.vue";
import { ref } from "vue";

export default {
  name: "CommentSectionComponent",
  props: {
    postId: String,
    loggedIn: Boolean,
    comments: {},
  },
  components: {
    CommentFormContainer,
    CommentContainer,
  },

  setup() {
    let commentFormActive = ref(false);
    return { commentFormActive };
  },
};
</script>

<template>
  <p class="font-bold text-xl mb-5">
    <span>Comments:</span>
  </p>
  <button
    v-if="loggedIn"
    @click="commentFormActive = !commentFormActive"
    class="py-2 px-4 border-b border-black button-bg-light-1 dark:button-bg-dark rounded-3xl"
  >
    <font-awesome-icon
      icon="fa-solid fa-plus"
      :class="['mr-2', commentFormActive ? 'icon-diagonal' : 'icon-vertical']"
    />
    Add a comment
  </button>
  <div class="w-3/4 m-auto my-4 flex">
    <CommentFormContainer
      v-if="commentFormActive"
      :post-id="postId"
      @toggle-comment-form="commentFormActive = !commentFormActive"
    ></CommentFormContainer>
  </div>
  <div class="mt-3">
    <CommentContainer
      v-for="comment in comments"
      :comment="comment"
    ></CommentContainer>
  </div>
</template>

<style scoped>
.icon-vertical {
  rotate: 0deg;
  transition: rotate 300ms;
}
.icon-diagonal {
  rotate: 135deg;
  transition: rotate 300ms;
}
</style>
