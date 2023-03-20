<script lang="ts">
import UserSubscriptionsComponent from "../components/UserSubscriptionsComponent.vue";
import { usePostStore } from "../store/blog";
import { useAuthStore } from "../store/auth";
import {
  onBeforeRouteUpdate,
  RouteLocationNormalized,
  useRoute,
} from "vue-router";
import { fetchUserSubscriptionsGuard } from "../router/guards/fetchUserSubscriptionsGuard";
import { cleanSubscriptionSort } from "../helper/helper";

export default {
  name: "UserSubscriptionsContainer",
  components: { UserSubscriptionsComponent },

  setup() {
    const route = useRoute();
    const postStore = usePostStore();
    const authStore = useAuthStore();

    onBeforeRouteUpdate(
      async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
        await fetchUserSubscriptionsGuard(to, from);
      }
    );

    const deleteSubscription = async (author_id: number) => {
      if (authStore.user) {
        const subscriber = authStore.user.id;
        const author = String(author_id);
        await postStore.deleteSubscription({ subscriber, author });
        await usePostStore().fetchUserSubscriptions(
          cleanSubscriptionSort(
            route.query.sort ? String(route.query.sort) : ""
          )
        );
      }
    };

    return { postStore, deleteSubscription };
  },
};
</script>

<template>
  <UserSubscriptionsComponent
    v-if="postStore.userSubscriptions"
    :subscriptions="postStore.userSubscriptions"
    @delete-subscription="deleteSubscription"
  ></UserSubscriptionsComponent>
</template>
