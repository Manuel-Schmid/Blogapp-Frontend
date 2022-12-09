<script lang="ts">
import { ref } from "vue";

export default {
  name: "CreatePostFormComponent",
  props: ["categories"],

  setup() {
    const title = ref("");
    const text = ref("");
    const tags = ref("");
    const categorySelection = ref("");
    const imageFile = ref(undefined);

    const onFileChange = (e: { target: { files: any[] } }) => {
      if (e.target.files.length > 0) {
        imageFile.value = e.target.files[0];
      }
    };

    return { title, text, imageFile, tags, categorySelection, onFileChange };
  },
};
</script>

<template>
  <div class="site-container">
    <div class="flex-container-centered">
      <div class="form-wrapper">
        <div class="form-layout">
          <h1 class="form-title md:text-xl text-left">
            {{ this.$t("components.create-post.title") }}
          </h1>
          <form ref="signupForm" class="form-inner-spacing" @submit.prevent="">
            <div>
              <label for="title" class="form-label">{{
                this.$t("components.create-post.form-title")
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
                this.$t("components.create-post.form-text")
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
                this.$t("components.create-post.form-image")
              }}</label>
              <input
                type="file"
                name="image"
                id="image"
                @change="onFileChange"
                class="form-input"
                required=""
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
                    this.$t("components.create-post.form-category-placeholder")
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
                  this.$t('components.create-post.form-tags-placeholder')
                "
                required=""
              />
            </div>
            <button
              @click="
                $emit(
                  'createPost',
                  title,
                  text,
                  imageFile,
                  categorySelection,
                  tags
                )
              "
              class="form-button"
            >
              Create post
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
