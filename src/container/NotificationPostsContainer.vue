<script lang="ts">
import NotificationPostsComponent from "../components/NotificationPostsComponent.vue";
import {
  onBeforeRouteUpdate,
  RouteLocationNormalized,
  useRoute,
} from "vue-router";
import { usePostStore } from "../store/blog";
import { fetchNotificationPostsGuard } from "../router/guards/fetchNotificationPostsGuard";

export default {
  name: "NotificationPostsContainer",
  components: {
    NotificationPostsComponent,
  },

  setup() {
    const route = useRoute();
    const postStore = usePostStore();
    const activePage: number = route.query.page ? +route.query.page : 1;

    onBeforeRouteUpdate(
      async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
        await fetchNotificationPostsGuard(to, from);
      }
    );

    return { postStore, activePage };
  },
};
</script>

<template>
  <NotificationPostsComponent
    :posts-data="postStore.paginatedNotificationPosts"
    :active-page="activePage"
  />
</template>
