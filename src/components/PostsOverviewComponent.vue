<script lang="ts">
import PostTileComponent from "./posts-overview/PostTileComponent.vue";
import TagListComponent from "./posts-overview/TagListComponent.vue";
import PaginationComponent from "./PaginationComponent.vue";

export default {
  name: "PostsOverviewComponent",
  components: {
    PostTileComponent,
    TagListComponent,
    PaginationComponent,
  },

  props: ["postsData", "tagsData", "activePage"],

  setup() {
    return {};
  },
};
</script>

<template>
  <div class="site-container p-12 dark:text-white">
    <div class="content-container m-auto w-full">
      <TagListComponent :tags-data="tagsData"></TagListComponent>
      <p
        class="text-3xl tracking-wide leading-5 text-black font-bold mb-8 mt-4 mt-9 dark:text-white"
      >
        Posts:
      </p>
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
