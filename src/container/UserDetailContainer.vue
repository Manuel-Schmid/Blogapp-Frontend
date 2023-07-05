<script lang="ts">
import UserDetailComponent from "../components/UserDetailComponent.vue";
import { usePostStore } from "../store/blog";
import { ref } from "vue";
import { useAuthStore } from "../store/auth";

export default {
  name: "UserDetailContainer",
  components: { UserDetailComponent },

  setup() {
    const postStore = usePostStore();
    const authStore = useAuthStore();
    const subscribed = ref(!!postStore.userDetail?.isSubscribed);

    const toggleSubscription = async () => {
      const subscriber = authStore.user?.id;
      const author = postStore.userDetail?.id;

      if (subscriber && author) {
        subscribed.value = !subscribed.value;

        if (!subscribed.value) {
          await postStore.deleteSubscription({ subscriber, author });
        } else {
          await postStore.createSubscription({ subscriber, author });
        }
        if (postStore.userDetail) {
          await postStore.fetchUserDetail(postStore.userDetail.username);
        }
      }
    };

    return { postStore, authStore, subscribed, toggleSubscription };
  },
};
</script>

<template>
  <UserDetailComponent
    v-if="postStore.userDetail"
    :auth-user-id="authStore.user?.id"
    :user-data="postStore.userDetail"
    :subscribed="subscribed"
    @toggle-subscription="toggleSubscription"
  ></UserDetailComponent>
</template>
