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
      if (e.target.files[0]) {
        imageFile.value = e.target.files[0];
      }
    };

    return { title, text, imageFile, tags, categorySelection, onFileChange };
  },
};
</script>

<template>
  <div class="mt-[9vh] h-[91vh]">
    <div class="w-full h-full flex justify-center items-center text-left">
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white"
          >
            Create your post
          </h1>
          <form
            ref="signupForm"
            class="space-y-4 md:space-y-5"
            @submit.prevent=""
          >
            <div>
              <label
                for="title"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Title</label
              >
              <input
                type="text"
                name="title"
                v-model="title"
                id="title"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Lorem ipsum dolor sit amet"
                required=""
              />
            </div>
            <div>
              <label
                for="text"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Text</label
              >
              <input
                type="text"
                name="text"
                v-model="text"
                id="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Aenean placerat finibus cursus"
                required=""
              />
            </div>
            <div>
              <label
                for="image"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Text</label
              >
              <input
                type="file"
                name="image"
                id="image"
                @change="onFileChange"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div>
              <label
                for="category"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Category</label
              >
              <select
                id="category"
                name="category"
                v-model="categorySelection"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              >
                <option value="" disabled selected>Select a category</option>
                <option v-for="category in categories" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div>
              <label
                for="tags"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Tags</label
              >
              <input
                type="text"
                name="tags"
                v-model="tags"
                id="tags"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Comma-separated list of tags (e.g. Sports, News, ...)"
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
              class="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
