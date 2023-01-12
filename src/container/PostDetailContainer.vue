<script lang="ts">
import PostDetailComponent from "../components/PostDetailComponent.vue";
import { usePostStore } from "../store/blog";
import { useAuthStore } from "../store/auth";
import { ref } from "vue";
import { onBeforeRouteUpdate, RouteLocationNormalized } from "vue-router";
import { fetchPostGuard } from "../router/guards/fetchPostGuard";

export default {
  name: "PostDetailView",
  components: {
    PostDetailComponent,
  },

  setup() {
    const postStore = usePostStore();
    const authStore = useAuthStore();
    let postLiked = ref(!!postStore.post?.isLiked);

    onBeforeRouteUpdate(
      async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
        await fetchPostGuard(to, from);
      }
    );

    const togglePostLike = async () => {
      if (postLiked.value) {
        await postStore.deletePostLike();
      } else {
        await postStore.createPostLike();
      }
      postLiked.value = !postLiked.value;
    };

    return { postStore, authStore, postLiked, togglePostLike };
  },
};
</script>

<template>
  <PostDetailComponent
    v-if="postStore.post"
    :post-data="postStore.post"
    :post-liked="postLiked"
    :logged-in="!!authStore.user"
    @toggle-post-like="togglePostLike"
  />
</template>
