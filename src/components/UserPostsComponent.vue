<script lang="ts">
import PostTileComponent from "./posts-overview/PostTileComponent.vue";
import PaginationComponent from "./PaginationComponent.vue";
import { formatDateShort, getImageURL } from "../helper/helper";
import { PostStatus } from "../api/models";

export default {
  name: "UserPostsComponent",
  components: {
    PostTileComponent,
    PaginationComponent,
  },

  props: ["postsData", "activePage"],
  setup(props: {}, { emit }: any) {
    const updatePostStatus = (postSlug: string, status: PostStatus) => {
      emit("updatePostStatus", postSlug, status);
    };
    return {
      PostStatus,
      formatDateShort,
      getImageURL,
      updatePostStatus,
    };
  },
};
</script>

<template>
  <div class="site-container p-12 dark:text-white">
    <div class="content-container m-auto w-full">
      <p class="page-title mb-10">
        {{ this.$t("shared.my-posts") }}
      </p>
      <table
        class="table-auto m-auto text-sm text-left text-gray-700 dark:text-gray-300 w-max text-center"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-50"
        ></thead>
        <tbody>
          <tr class="table-row">
            <th>Title</th>
            <th>Category</th>
            <th>Date created</th>
            <th>Image</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          <tr v-for="post in postsData.posts" :key="post.id" class="table-row">
            <td class="table-row-value">{{ post.title }}</td>
            <td>{{ post.category.name }}</td>
            <td>{{ formatDateShort(post.dateCreated) }}</td>
            <td>
              <img
                class="m-auto max-w-24 max-h-16 p-2"
                :src="getImageURL(post.image.name)"
                alt="Post Image"
              />
            </td>
            <td>
              <div
                v-if="post.status === 'DRAFT'"
                class="h-6 pr-2 text-color-pending"
              >
                DRAFT
                <font-awesome-icon icon="fa-regular fa-clock" class="ml-1" />
              </div>
              <div
                v-else-if="post.status === 'PUBLISHED'"
                class="h-6 pr-2 text-color-success"
              >
                PUBLISHED
                <font-awesome-icon
                  icon="fa-regular fa-circle-check"
                  class="ml-1"
                />
              </div>
            </td>
            <td>
              <button
                v-if="post.status === 'PUBLISHED'"
                @click="updatePostStatus(post.slug, PostStatus.Draft)"
                class="p-2 mx-1 bg-4"
              >
                DRAFT
              </button>
              <button
                v-else-if="post.status === 'DRAFT'"
                @click="updatePostStatus(post.slug, PostStatus.Published)"
                class="p-2 mx-1 bg-4"
              >
                PUBLISH
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <PaginationComponent
        v-if="postsData.numPostPages > 1"
        :num-pages="postsData.numPostPages"
        :active-page="activePage"
      ></PaginationComponent>
    </div>
  </div>
</template>

<style scoped></style>
