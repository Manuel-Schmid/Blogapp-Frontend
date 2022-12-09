<script lang="ts">
import UserPostsComponent from "../components/UserPostsComponent.vue";
import { usePostStore } from "../store/blog";
import { useRoute } from "vue-router";

export default {
  name: "UserPostsContainer",
  components: { UserPostsComponent },

  setup() {
    const route = useRoute();
    const postStore = usePostStore();
    const activePage: number = route.query.page ? +route.query.page : 1;
    return { postStore, activePage };
  },
};
</script>

<template>
  <UserPostsComponent
    v-if="postStore.paginatedUserPosts"
    :posts-data="postStore.paginatedUserPosts"
    :active-page="activePage"
  ></UserPostsComponent>
</template>
