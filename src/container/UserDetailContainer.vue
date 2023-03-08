<script lang="ts">
import UserDetailComponent from "../components/UserDetailComponent.vue";
import { usePostStore } from "../store/blog";

export default {
  name: "UserDetailContainer",
  components: { UserDetailComponent },

  setup() {
    const postStore = usePostStore();

    return { postStore };
  },
};
</script>

<template>
  <UserDetailComponent
    v-if="postStore.userDetail"
    :user-data="postStore.userDetail"
  ></UserDetailComponent>
</template>
