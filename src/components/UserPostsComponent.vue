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
            <th>{{ this.$t("components.my-posts.table.title") }}</th>
            <th>{{ this.$t("components.my-posts.table.category") }}</th>
            <th>{{ this.$t("components.my-posts.table.date_created") }}</th>
            <th>{{ this.$t("components.my-posts.table.image") }}</th>
            <th>{{ this.$t("components.my-posts.table.status") }}</th>
            <th>{{ this.$t("components.my-posts.table.actions") }}</th>
          </tr>
          <tr v-for="post in postsData.posts" :key="post.id" class="table-row">
            <td class="table-row-value">
              <router-link
                :to="{ name: 'postDetail', params: { slug: post.slug } }"
                class="underline underline-offset-2"
                >{{ post.title }}</router-link
              >
            </td>
            <td>{{ post.category.name }}</td>
            <td>{{ formatDateShort(post.dateCreated) }}</td>
            <td>
              <img
                class="m-auto max-w-[6rem] max-h-16 p-2"
                :src="getImageURL(post.image.name)"
                :alt="this.$t('components.my-posts.table.image')"
              />
            </td>
            <td>
              <div
                v-if="post.status === PostStatus.Draft"
                class="h-6 pr-2 text-color-pending"
              >
                {{ this.$t("components.my-posts.table.draft-noun") }}
                <font-awesome-icon icon="fa-regular fa-clock" class="ml-1" />
              </div>
              <div
                v-else-if="post.status === PostStatus.Published"
                class="h-6 pr-2 text-color-success"
              >
                {{ this.$t("components.my-posts.table.published") }}
                <font-awesome-icon
                  icon="fa-regular fa-circle-check"
                  class="ml-1"
                />
              </div>
            </td>
            <td>
              <router-link
                :to="{ name: 'updatePost', params: { slug: post.slug } }"
                class="p-2 mx-1 bg-4"
                >{{ this.$t("components.my-posts.table.edit") }}</router-link
              >
              <button
                v-if="post.status === PostStatus.Published"
                @click="updatePostStatus(post.slug, PostStatus.Draft)"
                class="p-2 mx-1 bg-4"
              >
                {{ this.$t("components.my-posts.table.draft-verb") }}
              </button>
              <button
                v-else-if="post.status === PostStatus.Draft"
                @click="updatePostStatus(post.slug, PostStatus.Published)"
                class="p-2 mx-1 bg-4"
              >
                {{ this.$t("components.my-posts.table.publish") }}
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
