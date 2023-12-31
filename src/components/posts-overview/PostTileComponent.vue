<script lang="ts">
import {
  formatFullname,
  formatDateShort,
  getImageURL,
} from "../../helper/helper";

export default {
  name: "PostTileComponent",
  props: ["post", "displayAuthor"],

  setup() {
    return { formatFullname, formatDateShort, getImageURL };
  },
};
</script>

<template>
  <router-link
    :to="{ name: 'postDetail', params: { slug: post.slug } }"
    :class="[
      'post rounded-2xl shadow-lg mt-2 mb-4 pt-5 px-2 pb-1 float-left inline-block text-black no-underline bg-4 hover:shadow-2xl',
    ]"
  >
    <div
      class="post-title tracking-wide tracking-wide pt-0 pr-4 pb-0 pl-4 leading-5 text-black font-bold dark:text-white"
    >
      <p class="mb-4">{{ post.title }}</p>
    </div>
    <div class="leading-4">
      <p>
        <span v-if="displayAuthor" class="post-owner">
          <router-link
            :to="{
              name: 'userDetail',
              params: { username: post.owner.username },
            }"
            class="hover:underline"
          >
            {{ formatFullname(post.owner.firstName, post.owner.lastName) }}
          </router-link>
          -
        </span>
        {{ formatDateShort(post.dateCreated) }}
      </p>
    </div>
    <div v-if="post.image.name" class="pt-3 pb-1 px-2 h-44 flex">
      <img
        class="w-full max-h-full"
        :src="getImageURL(post.image.name)"
        alt="Post Image"
      />
    </div>
    <p v-else class="italic">{{ this.$t("shared.no-image") }}</p>
    <div class="w-1/2 float-left text-left">
      <div class="m-2 icons-container">
        <span class="ml-2 w-1/2">
          <font-awesome-icon icon="fa-thumbs-up"></font-awesome-icon>
          {{ post.likeCount }}
        </span>
        <span class="ml-5 w-1/2">
          <font-awesome-icon icon="fa-comment"></font-awesome-icon>
          {{ post.commentCount }}
        </span>
      </div>
    </div>
    <div class="w-1/2 float-right text-right">
      <p class="m-2">{{ post.category.name }}</p>
    </div>
  </router-link>
</template>

<style scoped>
.user-posts .post-owner {
  display: none;
}
.post {
  width: calc(40% - 25px);
  margin-right: 5%;
  margin-left: 5%;
  transition: box-shadow 200ms;
}
.post-title {
  font-size: 1.4em;
}
.icons-container {
  width: calc(100% - 1rem);
}
</style>
