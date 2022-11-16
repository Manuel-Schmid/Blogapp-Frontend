<script lang="ts">
import CommentComponent from "../components/CommentComponent.vue";
import { useAuthStore } from "../store/auth";
import { usePostStore } from "../store/blog";

export default {
  name: "CommentContainer",
  components: { CommentComponent },
  props: ["comment", "isOwnComment"],
  setup() {
    let authStore = useAuthStore();
    let postStore = usePostStore();
    return { authStore, postStore };
  },
};
</script>

<template>
  <CommentComponent
    :comment="comment"
    :is-own-comment="comment.owner.id === authStore.user?.id"
    @delete-comment="postStore.deleteComment(comment.id)"
  ></CommentComponent>
</template>
