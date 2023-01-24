<script lang="ts">
import PostFormComponent from "../components/PostFormComponent.vue";
import { usePostStore } from "../store/blog";
import { useRoute } from "vue-router";
import router from "../router/router";

export default {
  name: "CreatePostFormContainer",
  components: { PostFormComponent },

  setup() {
    const postStore = usePostStore();
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

    return { postStore, updatePost };
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
    :image="postStore.post.image"
    :tags="postStore.post.tags.map((tag) => tag.name).join(', ')"
    :category-selection="postStore.post.category.id"
    :related-posts-selection="
      postStore.post.relatedSubPosts.map((subPost) => subPost.id)
    "
    @save-post="updatePost"
  ></PostFormComponent>
</template>
