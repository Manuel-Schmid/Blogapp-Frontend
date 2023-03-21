<script lang="ts">
import PostTileComponent from "./posts-overview/PostTileComponent.vue";
import PaginationComponent from "./PaginationComponent.vue";

export default {
  name: "NotificationPostsComponent",
  components: {
    PostTileComponent,
    PaginationComponent,
  },

  props: ["postsData", "activePage"],

  setup() {
    return {};
  },
};
</script>

<template>
  <div class="site-container p-12 dark:text-white">
    <div class="content-container m-auto w-full">
      <p class="page-title mb-8">{{ this.$t("shared.latest-posts") }}:</p>
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
        <div v-else class="float-left w-full pb-10"></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
