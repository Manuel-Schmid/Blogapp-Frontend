<script lang="ts">
import { formatFullname, getImageURL } from "../helper/helper";
import PostTileComponent from "./posts-overview/PostTileComponent.vue";
import PaginationComponent from "./PaginationComponent.vue";

export default {
  name: "UserDetailComponent",
  props: ["userData"],
  components: {
    PostTileComponent,
    PaginationComponent,
  },

  setup() {
    return { formatFullname, getImageURL };
  },
};
</script>

<template>
  <div class="site-container px-12">
    <div class="content-container-sm m-auto w-full">
      <div
        class="leading-5 text-black dark:text-white px-20 pt-20 pb-10 flex flex-row"
      >
        <div class="">
          <img
            v-if="userData.avatar.name"
            class="w-80 max-w-80 max-h-80"
            :src="getImageURL(userData.avatar.name)"
            alt="Post Image"
          />
          <p v-else class="italic">{{ this.$t("shared.no-image") }}</p>
        </div>
        <div class="text-left px-10 py-5">
          <p class="mb-0 text-2xl font-bold">
            {{ formatFullname(userData.firstName, userData.lastName) }}
          </p>
          <p class="text-md">@{{ userData.username }}</p>
          <table class="mt-5 w-max">
            <tr>
              <th class="pr-2 font-medium">{{ this.$t("shared.email") }}:</th>
              <td>
                <a :href="'mailto:' + userData.email">{{ userData.email }}</a>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="content-container m-auto w-full">
      <p class="page-title mb-8">{{ this.$t("shared.posts-title") }}:</p>
      <div v-if="userData.posts" class="pl-[50px]">
        <PostTileComponent
          v-for="post in userData.posts"
          :key="post.id"
          :post="post"
          :display-author="false"
        >
        </PostTileComponent>
      </div>
      <div class="float-left w-full pb-10"></div>
    </div>
  </div>
</template>

<style scoped></style>
