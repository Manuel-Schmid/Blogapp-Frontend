<script lang="ts">
import CreatePostFormComponent from "../components/CreatePostFormComponent.vue";
import { usePostStore } from "../store/blog";
import router from "../router/router";

export default {
  name: "CreatePostFormContainer",
  components: { CreatePostFormComponent },

  setup() {
    const postStore = usePostStore();

    const createPost = async (
      title: string,
      text: string,
      image: any,
      category: string,
      tags: string
    ) => {
      if (title && text && category) {
        await postStore.createPost({
          title,
          text,
          image,
          category,
          tags,
        });
        const postSlug = await postStore.post?.slug;
        await router.push({
          name: "postDetail",
          params: { slug: postSlug },
        });
      }
    };

    const postNames = postStore.paginatedPosts?.posts.map((p) => p.title);

    return { postStore, postNames, createPost };
  },
};
</script>

<template>
  <CreatePostFormComponent
    :categories="postStore.categories"
    :post-names="postNames"
    @create-post="createPost"
  ></CreatePostFormComponent>
</template>
