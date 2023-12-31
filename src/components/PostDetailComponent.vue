<script lang="ts">
import { formatDateLong, getImageURL, formatFullname } from "../helper/helper";
import CommentSectionContainer from "../container/CommentSectionContainer.vue";
import PostTileComponent from "./posts-overview/PostTileComponent.vue";

export default {
  name: "PostDetailComponent",
  props: [
    "postData",
    "postLiked",
    "subscribed",
    "user",
    "commentSectionCollapsed",
    "relatedPostsCollapsed",
  ],
  components: {
    CommentSectionContainer,
    PostTileComponent,
  },

  setup(props: {}, { emit }: any) {
    const toggleLike = () => {
      emit("togglePostLike");
    };

    const toggleSubscription = () => {
      emit("toggleSubscription");
    };

    const toggleCommentSectionCollapsed = () => {
      emit("toggleCommentSectionCollapsed");
    };

    const toggleRelatedPostsCollapsed = () => {
      emit("toggleRelatedPostsCollapsed");
    };

    return {
      formatDateLong,
      getImageURL,
      formatFullname,
      toggleLike,
      toggleSubscription,
      toggleCommentSectionCollapsed,
      toggleRelatedPostsCollapsed,
    };
  },
};
</script>

<template>
  <div class="site-container p-12 dark:text-white">
    <div class="detail-post content-container m-auto">
      <router-link
        v-if="user?.id === postData.owner.id"
        :to="{ name: 'updatePost', params: { slug: postData.slug } }"
        class="py-2 px-3 absolute right-12 mr-10 z-10 cursor-pointer button-bg-light-2 dark:button-bg-dark"
        >{{ this.$t("components.my-posts.table.edit") }}</router-link
      >
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
        <div>
          -
          <router-link
            :to="{
              name: 'userDetail',
              params: { username: postData.owner.username },
            }"
            class="hover:underline"
          >
            {{
              formatFullname(postData.owner.firstName, postData.owner.lastName)
            }}
          </router-link>
        </div>
      </div>
      <div class="px-8 py-2 mt-6">
        <img
          v-if="postData.image.name"
          class="w-full"
          :src="getImageURL(postData.image.name)"
          alt="Post Image"
        />
        <p v-else class="italic">{{ this.$t("shared.no-image") }}</p>
      </div>
      <div class="mt-4 w-full pb-8">
        <div class="w-full">
          <div class="mt-2 mr-8">
            <div class="text-center float-right w-max flex flex-col">
              <font-awesome-icon
                v-if="user"
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
            <div
              v-if="user && user.id !== postData.owner.id"
              class="text-center float-right w-max flex flex-col mr-5 mt-1"
            >
              <button
                class="shadow-lg font-bold text-sm rounded px-3 py-2"
                :class="[
                  subscribed
                    ? 'button-bg-light-2 dark:button-bg-dark'
                    : 'bg-blue-600 text-white',
                ]"
                @click="toggleSubscription"
              >
                {{
                  subscribed
                    ? this.$t("components.subscriptions.subscribed")
                    : this.$t("components.subscriptions.subscribe")
                }}
              </button>
            </div>
          </div>
          <div class="flex mb-1 ml-8 m-0">
            <p class="font-bold mr-1">{{ this.$t("shared.category") }}</p>
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
            <p class="font-bold mr-1 w-min float-left">
              {{ this.$t("shared.tags") }}:
            </p>
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
            <p
              @click="toggleCommentSectionCollapsed"
              class="section-title no-select"
            >
              <span class="pr-2"
                >{{ this.$t("components.comment-section.title") }}:</span
              >
              <font-awesome-icon
                icon="fa-solid fa-angle-down"
                class="sort-icon"
                :class="[commentSectionCollapsed ? 'icon-up' : 'icon-down']"
              />
            </p>
            <CommentSectionContainer
              v-if="!commentSectionCollapsed"
              :post-id="postData.id"
              :comments="postData.comments"
              :logged-in="!!user"
            ></CommentSectionContainer>
          </div>
          <div v-if="postData.relatedSubPosts.length" class="flow-root">
            <p
              @click="toggleRelatedPostsCollapsed"
              class="section-title no-select mt-6"
            >
              <span class="pr-2">{{ this.$t("shared.related-posts") }}:</span>
              <font-awesome-icon
                icon="fa-solid fa-angle-down"
                class="sort-icon"
                :class="[relatedPostsCollapsed ? 'icon-up' : 'icon-down']"
              />
            </p>
            <div v-if="!relatedPostsCollapsed" class="pl-[50px]">
              <PostTileComponent
                v-for="post in postData.relatedSubPosts"
                :key="post.id"
                :post="post"
              >
              </PostTileComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-post {
  min-width: 660px;
}
.post a:hover {
  text-decoration: underline;
}
.post-title {
  letter-spacing: 1px;
  font-size: 2em;
}
.section-title {
  @apply font-bold text-xl mb-5 cursor-pointer mx-auto w-max;
}
.icon-up {
  rotate: 0deg;
  transition: rotate 300ms;
}
.icon-down {
  rotate: 180deg;
  transition: rotate 300ms;
}
</style>
