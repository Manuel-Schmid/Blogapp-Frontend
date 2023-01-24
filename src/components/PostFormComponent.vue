<script lang="ts">
import { ref } from "vue";
import Multiselect from "@vueform/multiselect";
import { getImageURL } from "../helper/helper";

export default {
  name: "CreatePostFormComponent",
  components: { Multiselect },
  props: [
    "formTitle",
    "categories",
    "postTitles",
    "formButtonText",
    "title",
    "text",
    "tags",
    "image",
    "categorySelection",
    "relatedPostsSelection",
  ],

  setup(
    props: {
      title: string;
      text: string;
      tags: string;
      categorySelection: string;
      relatedPostsSelection: string;
    },
    { emit }: any
  ) {
    const title = ref(props.title);
    const text = ref(props.text);
    const tags = ref(props.tags);
    const categorySelection = ref(props.categorySelection);
    const imageFile = ref(undefined);
    let relatedPostsSelection = ref(props.relatedPostsSelection);

    const onFileChange = (e: { target: { files: any[] } }) => {
      if (e.target.files.length > 0) {
        imageFile.value = e.target.files[0];
      }
    };

    return {
      title,
      text,
      imageFile,
      tags,
      categorySelection,
      relatedPostsSelection,
      getImageURL,
      onFileChange,
    };
  },
};
</script>

<template>
  <div class="site-container">
    <div class="flex-container-centered h-auto py-10">
      <div class="form-wrapper">
        <div class="form-layout">
          <h1 class="form-title md:text-xl text-left">
            {{ formTitle }}
          </h1>
          <form ref="signupForm" class="form-inner-spacing" @submit.prevent="">
            <div>
              <label for="title" class="form-label">{{
                this.$t("components.post-form.form-title")
              }}</label>
              <input
                type="text"
                name="title"
                v-model="title"
                id="title"
                class="form-input"
                placeholder="Lorem ipsum dolor sit amet"
                required=""
              />
            </div>
            <div>
              <label for="text" class="form-label">{{
                this.$t("components.post-form.form-text")
              }}</label>
              <input
                type="text"
                name="text"
                v-model="text"
                id="text"
                class="form-input"
                placeholder="Aenean placerat finibus cursus"
                required=""
              />
            </div>
            <div>
              <label for="image" class="form-label">{{
                this.$t("components.post-form.form-image")
              }}</label>
              <input
                type="file"
                name="image"
                id="image"
                @change="onFileChange"
                class="form-input"
                required=""
              />
              <img
                v-if="image"
                :src="getImageURL(image.name)"
                class="mt-4"
                alt="Post Image"
              />
            </div>
            <div>
              <label for="category" class="form-label">{{
                this.$t("shared.category")
              }}</label>
              <select
                id="category"
                name="category"
                v-model="categorySelection"
                class="form-input"
                required=""
              >
                <option value="" disabled selected>
                  {{
                    this.$t("components.post-form.form-category-placeholder")
                  }}
                </option>
                <option v-for="category in categories" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div>
              <label for="tags" class="form-label">{{
                this.$t("shared.tags")
              }}</label>
              <input
                type="text"
                name="tags"
                v-model="tags"
                id="tags"
                class="form-input"
                :placeholder="
                  this.$t('components.post-form.form-tags-placeholder')
                "
                required=""
              />
            </div>
            <div v-if="postTitles">
              <label for="related-posts" class="form-label">{{
                this.$t("shared.related-posts")
              }}</label>
              <Multiselect
                v-model="relatedPostsSelection"
                mode="tags"
                :close-on-select="false"
                :searchable="true"
                :placeholder="
                  this.$t('components.post-form.form-related-posts-placeholder')
                "
                :options="postTitles"
                class="multiselect dark:multiselect-dark"
              />
            </div>
            <button
              @click="
                $emit(
                  'savePost',
                  title,
                  text,
                  imageFile,
                  categorySelection,
                  tags,
                  relatedPostsSelection.map((i) => parseInt(i))
                )
              "
              class="form-button"
            >
              {{ formButtonText }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
