<script lang="ts">
import AuthorRequestOverviewComponent from "../components/AuthorRequestOverviewComponent.vue";
import { usePostStore } from "../store/blog";
import { useRoute } from "vue-router";
import { Status } from "../api/models";
export default {
  name: "AuthorRequestOverview",
  components: { AuthorRequestOverviewComponent },
  setup() {
    const route = useRoute();
    const postStore = usePostStore();
    const activePage: number = route.query.page ? +route.query.page : 1;

    const updateAuthorRequest = async (user: string, status: Status) => {
      if (user && status) {
        const authorRequestInput = {
          user,
          status,
        };

        const success = await postStore.updateAuthorRequest(authorRequestInput);
        if (success) {
          // todo: status
          await postStore.fetchAuthorRequests(undefined, activePage);
        }
      }
    };

    return { postStore, activePage, updateAuthorRequest };
  },
};
</script>

<template>
  <AuthorRequestOverviewComponent
    :author-requests-data="postStore.paginatedAuthorRequests"
    :active-page="activePage"
    @update-author-request="updateAuthorRequest"
  ></AuthorRequestOverviewComponent>
</template>
