<script lang="ts">
import PostFormComponent from "../components/PostFormComponent.vue";
import { usePostStore } from "../store/blog";
import { useRoute } from "vue-router";
import router from "../router/router";
import { useAuthStore } from "../store/auth";

export default {
  name: "CreatePostFormContainer",
  components: { PostFormComponent },

  setup() {
    const postStore = usePostStore();
    const authStore = useAuthStore();
    const route = useRoute();

    const updatePost = async (
      title: string,
      text: string,
      image: any,
      category: string,
      tags: string,
      relatedPosts: number[]
    ) => {
      if (title && text && category) {
        const postSlug = route.params.slug as string;
        const success = await postStore.updatePost({
          slug: postSlug,
          title,
          text,
          image,
          category,
          tags,
          relatedPosts,
        });
        if (success) {
          await router.push({
            name: "postDetail",
            params: { slug: postSlug },
          });
        }
      }
    };

    return { postStore, authStore, updatePost };
  },
};
</script>

<template>
  <PostFormComponent
    v-if="postStore.post?.owner.id === authStore.user.id"
    :post="postStore.post"
    :categories="postStore.categories"
    :post-titles="
      postStore.postTitles.filter((item) => item.value !== postStore.post?.id)
    "
    :form-title="this.$t('components.post-form.update-post-title')"
    :form-button-text="this.$t('shared.save')"
    @save-post="updatePost"
  ></PostFormComponent>
</template>
