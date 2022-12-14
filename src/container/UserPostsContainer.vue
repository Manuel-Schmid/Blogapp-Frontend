<script lang="ts">
import UserPostsComponent from "../components/UserPostsComponent.vue";
import { usePostStore } from "../store/blog";
import {
  onBeforeRouteUpdate,
  RouteLocationNormalized,
  useRoute,
} from "vue-router";
import { PostStatus } from "../api/models";
import { fetchUserPostsGuard } from "../router/guards/fetchUserPostsGuard";

export default {
  name: "UserPostsContainer",
  components: { UserPostsComponent },

  setup() {
    const route = useRoute();
    const postStore = usePostStore();
    const activePage: number = route.query.page ? +route.query.page : 1;

    onBeforeRouteUpdate(
      async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
        await fetchUserPostsGuard(to, from);
      }
    );

    const updatePostStatus = async (postSlug: string, status: PostStatus) => {
      if (postSlug && status) {
        const updatePostStatusInput = {
          postSlug,
          status,
        };

        const success = await postStore.updatePostStatus(updatePostStatusInput);
        if (success) {
          await fetchUserPostsGuard(route, route);
        }
      }
    };

    return { postStore, activePage, updatePostStatus };
  },
};
</script>

<template>
  <UserPostsComponent
    v-if="postStore.paginatedUserPosts"
    :posts-data="postStore.paginatedUserPosts"
    :active-page="activePage"
    @update-post-status="updatePostStatus"
  ></UserPostsComponent>
</template>
