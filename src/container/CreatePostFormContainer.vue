<script lang="ts">
import PostFormComponent from "../components/PostFormComponent.vue";
import { usePostStore } from "../store/blog";
import router from "../router/router";

export default {
  name: "CreatePostFormContainer",
  components: { PostFormComponent },

  setup() {
    const postStore = usePostStore();

    const createPost = async (
      title: string,
      text: string,
      image: any,
      category: string,
      tags: string,
      relatedPosts: number[]
    ) => {
      if (title && text && category) {
        await postStore.createPost({
          title,
          text,
          image,
          category,
          tags,
          relatedPosts,
        });
        const postSlug = await postStore.post?.slug;
        await router.push({
          name: "postDetail",
          params: { slug: postSlug },
        });
      }
    };

    return { postStore, createPost };
  },
};
</script>

<template>
  <PostFormComponent
    :post="null"
    :categories="postStore.categories"
    :post-titles="postStore.postTitles"
    :form-title="this.$t('components.post-form.create-post-title')"
    :form-button-text="this.$t('components.post-form.create-post-button')"
    @save-post="createPost"
  ></PostFormComponent>
</template>
