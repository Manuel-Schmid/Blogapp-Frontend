<script lang="ts">
import CreatePostFormComponent from "../components/CreatePostFormComponent.vue";
import { usePostStore } from "../store/blog";
import router from "../router/router";

export default {
  name: "CreatePostFormContainer",
  components: { CreatePostFormComponent },

  setup() {
    const postStore = usePostStore();
    postStore.fetchCategories();
    const createPost = async (
      title: string,
      text: string,
      category: string
    ) => {
      if (title && text && category) {
        await postStore.createPost({
          title: title,
          text: text,
          category: category,
        });
        const postSlug = await postStore.post?.slug;
        console.log(postSlug);
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
  <CreatePostFormComponent
    :categories="postStore.categories"
    @create-post="createPost"
  ></CreatePostFormComponent>
</template>
