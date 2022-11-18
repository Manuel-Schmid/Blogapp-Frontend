<script lang="ts">
import { formatDateLong, getImageURL, formatFullname } from "../helper/helper";
import CommentSectionContainer from "../container/CommentSectionContainer.vue";

export default {
  name: "PostDetailComponent",
  props: ["postData", "postLiked", "loggedIn"],
  components: {
    CommentSectionContainer,
  },

  setup(props: {}, { emit }: any) {
    const toggleLike = () => {
      emit("togglePostLike");
    };

    return {
      formatDateLong,
      getImageURL,
      formatFullname,
      toggleLike,
    };
  },
};
</script>

<template>
  <div class="site-container p-12 dark:text-white">
    <div class="post content-container m-auto">
      <div>
        <div class="w-full relative">
          <div
            class="post-title leading-5 text-black dark:text-white font-bold mb-3"
          >
            <p class="mb-0">{{ postData.title }}</p>
          </div>
          <div>
            <p class="mb-0">
              {{ formatDateLong(postData.dateCreated) }}
            </p>
          </div>
        </div>
        <div class="px-8 pt-8 pb-0 text-left">
          <p>
            {{ postData.text }}
          </p>
        </div>
        <div class="pr-10 text-right mt-3">
          <p>
            -
            {{
              formatFullname(postData.owner.firstName, postData.owner.lastName)
            }}
          </p>
        </div>
        <div v-if="postData.image" class="px-8 py-2 mt-6">
          <img
            class="w-full"
            :src="getImageURL(postData.image.name)"
            alt="Post Image"
          />
        </div>
        <div class="mt-4 w-full">
          <div class="w-full">
            <div class="mt-2 mr-8">
              <div class="text-center float-right w-max flex flex-col">
                <font-awesome-icon
                  v-if="loggedIn"
                  icon="fa-thumbs-up"
                  class="text-3xl mb-0.5 cursor-pointer w-full"
                  :class="[
                    postLiked
                      ? 'text-blue-700 dark:text-white'
                      : 'dark:text-slate-500',
                  ]"
                  @click="toggleLike"
                ></font-awesome-icon>
                <font-awesome-icon
                  v-else
                  icon="fa-thumbs-up"
                  class="text-3xl mb-0.5 dark:text-slate-500"
                ></font-awesome-icon>
                <span class="w-full cursor-default">{{
                  postData.likeCount
                }}</span>
              </div>
            </div>
            <div class="flex mb-1 ml-8 m-0">
              <p class="font-bold mr-1">Category:</p>
              <router-link
                :to="{
                  name: 'posts',
                  query: { category: postData.category.slug },
                }"
                class="text-black no-underline"
              >
                {{ postData.category.name }}
              </router-link>
            </div>
            <div class="ml-8 m-0 text-left w-[80%]">
              <p class="font-bold mr-1 w-min float-left">Tags:</p>
              <router-link
                v-for="tag in postData.tags"
                :to="{ name: 'posts', query: { tags: tag.slug } }"
                :key="tag.slug"
                class="text-black no-underline mr-1"
              >
                {{
                  tag.name +
                  (tag === postData.tags[postData.tags.length - 1] ? "" : ",")
                }}
              </router-link>
            </div>
            <div class="w-full mt-8">
              <CommentSectionContainer
                :post-id="postData.id"
                :comments="postData.comments"
                :logged-in="loggedIn"
              ></CommentSectionContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post {
  min-width: 660px;
}
.post a:hover {
  text-decoration: underline;
}
.post-title {
  letter-spacing: 1px;
  font-size: 2em;
}
</style>
