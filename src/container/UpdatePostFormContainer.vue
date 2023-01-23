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
    v-if="postStore.post"
    :form-title="this.$t('components.post-form.update-post-title')"
    :form-button-text="this.$t('shared.save')"
    :categories="postStore.categories"
    :post-titles="postStore.fetchPostTitles"
    :title="postStore.post.title"
    :text="postStore.post.text"
    :tags="postStore.post.tags.map((tag) => tag.name).join(', ')"
    :category-selection="postStore.post.category.id"
    :related-posts-selection="['2', '4']"
    @save-post="createPost"
  ></PostFormComponent>
</template>
