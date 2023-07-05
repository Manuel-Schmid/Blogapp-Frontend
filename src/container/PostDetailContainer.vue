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
    const postLiked = ref(!!postStore.post?.isLiked);
    const subscribed = ref(!!postStore.post?.isSubscribed);
    const commentSectionCollapsed = ref(
      authStore.user ? !!authStore.user.profile.commentSectionCollapsed : false
    );
    const relatedPostsCollapsed = ref(
      authStore.user ? !!authStore.user.profile.relatedPostsCollapsed : false
    );

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

    const toggleSubscription = async () => {
      if (authStore.user && postStore.post) {
        const subscriber = authStore.user.id;
        const author = postStore.post.owner.id;
        subscribed.value = !subscribed.value;

        if (!subscribed.value) {
          await postStore.deleteSubscription({ subscriber, author });
        } else {
          await postStore.createSubscription({ subscriber, author });
        }
        await postStore.fetchPost(postStore.post.slug, false);
      }
    };

    const toggleCommentSectionCollapsed = async () => {
      commentSectionCollapsed.value = !commentSectionCollapsed.value;
      if (authStore.user) {
        const userProfileInput = authStore.user.profile;
        userProfileInput.commentSectionCollapsed =
          !userProfileInput.commentSectionCollapsed;
        await authStore.updateUserProfile(userProfileInput);
      }
    };

    const toggleRelatedPostsCollapsed = async () => {
      relatedPostsCollapsed.value = !relatedPostsCollapsed.value;
      if (authStore.user) {
        const userProfileInput = authStore.user.profile;
        userProfileInput.relatedPostsCollapsed =
          !userProfileInput.relatedPostsCollapsed;
        await authStore.updateUserProfile(userProfileInput);
      }
    };

    return {
      postStore,
      authStore,
      postLiked,
      subscribed,
      commentSectionCollapsed,
      relatedPostsCollapsed,
      togglePostLike,
      toggleSubscription,
      toggleCommentSectionCollapsed,
      toggleRelatedPostsCollapsed,
    };
  },
};
</script>

<template>
  <PostDetailComponent
    v-if="postStore.post"
    :post-data="postStore.post"
    :post-liked="postLiked"
    :subscribed="subscribed"
    :user="authStore.user"
    :comment-section-collapsed="commentSectionCollapsed"
    :related-posts-collapsed="relatedPostsCollapsed"
    @toggle-post-like="togglePostLike"
    @toggle-subscription="toggleSubscription"
    @toggle-comment-section-collapsed="toggleCommentSectionCollapsed"
    @toggle-related-posts-collapsed="toggleRelatedPostsCollapsed"
  />
</template>
