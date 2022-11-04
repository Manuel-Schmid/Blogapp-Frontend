<script lang="ts">
import CommentSectionComponent from "../components/CommentSectionComponent.vue";
import { useAuthStore } from "../store/auth";
export default {
  name: "CommentSectionContainer",
  components: { CommentSectionComponent },
  props: {
    postId: String,
    loggedIn: Boolean,
    comments: {},
  },
  setup() {
    let authStore = useAuthStore();
    return { authStore };
  },
};
</script>

<template>
  <CommentSectionComponent
    :post-id="postId"
    :comments="comments"
    :logged-in="loggedIn"
  ></CommentSectionComponent>
</template>
