<script lang="ts">
import PostsOverviewComponent from "../components/PostsOverviewComponent.vue";
import {
  onBeforeRouteUpdate,
  RouteLocationNormalized,
  useRoute,
} from "vue-router";
import { usePostStore } from "../store/blog";
import { fetchPostsGuard } from "../router/guards/fetchPostsGuard";
import { fetchUsedTagsGuard } from "../router/guards/fetchUsedTagsGuard";
import { fetchCategoriesGuard } from "../router/guards/fetchCategoriesGuard";

export default {
  name: "PostsOverviewContainer",
  components: {
    PostsOverviewComponent,
  },

  setup() {
    const route = useRoute();
    const store = usePostStore();
    const activePage: number = route.query.page ? +route.query.page : 1;

    onBeforeRouteUpdate(
      async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
        await fetchPostsGuard(to, from);
        await fetchCategoriesGuard(to, from);
        await fetchUsedTagsGuard(to, from);
      }
    );

    return { store, activePage };
  },
};
</script>

<template>
  <PostsOverviewComponent
    :posts-data="store.paginatedPosts"
    :active-page="activePage"
    :categories-data="store.categories"
    :tags-data="store.usedTags"
  />
</template>
