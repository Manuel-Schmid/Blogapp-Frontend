<script lang="ts">
import CommentFormComponent from "../components/CommentFormComponent.vue";
import { usePostStore } from "../store/blog";

export default {
  name: "CommentFormContainer",
  components: { CommentFormComponent },
  emits: ["toggleCommentForm"],

  props: {
    postId: String,
  },

  setup(props: { postId: string }, ctx: { emit: (arg0: string) => void }) {
    const saveComment = (title: string, text: string) => {
      if (!(title && text)) {
        return;
      }
      const commentInput = {
        title: title,
        text: text,
        post: props.postId,
      };
      usePostStore().createComment(commentInput);

      ctx.emit("toggleCommentForm");
    };

    return { saveComment };
  },
};
</script>

<template>
  <CommentFormComponent @save-comment="saveComment"></CommentFormComponent>
</template>
