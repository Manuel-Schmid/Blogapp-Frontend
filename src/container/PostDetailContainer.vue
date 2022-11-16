<script lang="ts">
import { useRoute } from "vue-router/dist/vue-router";
import PostDetailComponent from "../components/PostDetailComponent.vue";
import { usePostStore } from "../store/blog";
import { useAuthStore } from "../store/auth";
import { ref } from "vue";

export default {
  name: "PostDetailView",
  components: {
    PostDetailComponent,
  },

  setup() {
    const route = useRoute();
    const postStore = usePostStore();
    const authStore = useAuthStore();
    let postLiked = ref(!!postStore.post?.isLiked);
    postStore.fetchPost(route.params.slug as string, true);

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
