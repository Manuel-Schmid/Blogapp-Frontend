<script lang="ts">
import { ref } from "vue";

export default {
  name: "EmailChangeFormComponent",
  props: ["emailChangeSuccess"],

  setup() {
    const newEmail1 = ref("");
    const newEmail2 = ref("");

    return { newEmail1, newEmail2 };
  },
};
</script>

<template>
  <div class="email-change-container h-[91vh]">
    <div class="w-full h-full flex justify-center items-center text-left">
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center"
          >
            Change your email address
          </h1>
          <form @submit.prevent="">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >New email address</label
              >
              <input
                type="email"
                name="newEmail1"
                v-model="newEmail1"
                id="email"
                placeholder="john.doe@example.com"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div class="mt-3">
              <label
                for="emailConfirm"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Confirm new email address</label
              >
              <input
                type="email"
                name="newEmail2"
                v-model="newEmail2"
                id="emailConfirm"
                placeholder="john.doe@example.com"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div
              v-if="emailChangeSuccess"
              class="flex items-center justify-between mt-1 mb-3"
            >
              <div class="flex items-start text-green-500">
                Email change successful.
              </div>
            </div>
            <div
              v-else-if="emailChangeSuccess === false"
              class="flex items-center justify-between mt-1 mb-3"
            >
              <div class="flex items-start text-red-600">
                Email change failed.
              </div>
            </div>
            <div v-else class="my-7"></div>
            <button
              @click="$emit('emailChange', newEmail1, newEmail2)"
              class="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Change Email
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.email-change-container {
  margin-top: 9vh;
}
</style>
