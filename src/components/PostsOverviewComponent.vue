<script lang="ts">
import PostTileComponent from "./posts-overview/PostTileComponent.vue";
import FilterComponent from "./posts-overview/FilterComponent.vue";
import PaginationComponent from "./PaginationComponent.vue";

export default {
  name: "PostsOverviewComponent",
  components: {
    PostTileComponent,
    FilterComponent,
    PaginationComponent,
  },

  props: ["postsData", "categoriesData", "tagsData", "activePage"],

  setup() {
    return {};
  },
};
</script>

<template>
  <div class="site-container p-12 dark:text-white">
    <div class="content-container m-auto w-full">
      <FilterComponent
        :filter-items="categoriesData"
        query-key="category"
        :multiselect="false"
      ></FilterComponent>
      <FilterComponent
        :filter-items="tagsData"
        query-key="tags"
        :multiselect="true"
      ></FilterComponent>
      <p class="page-title mb-8 mt-9">{{ this.$t("shared.posts-title") }}:</p>
      <div v-if="postsData" class="pl-[50px]">
        <PostTileComponent
          v-for="post in postsData.posts"
          :key="post.id"
          :post="post"
        >
        </PostTileComponent>
        <PaginationComponent
          v-if="postsData.numPostPages > 1"
          :num-pages="postsData.numPostPages"
          :active-page="activePage"
        ></PaginationComponent>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
