<script lang="ts">
import { formatFullname, getImageURL } from "../helper/helper";

export default {
  name: "UserDetailComponent",
  props: ["userData"],

  setup() {
    return { formatFullname, getImageURL };
  },
};
</script>

<template>
  <div class="site-container">
    <div class="content-container-sm m-auto w-full">
      <div class="leading-5 text-black dark:text-white p-20 flex flex-row">
        <div class="">
          <img
            v-if="userData.avatar.name"
            class="w-80 max-w-80 max-h-80"
            :src="getImageURL(userData.avatar.name)"
            alt="Post Image"
          />
          <p v-else class="italic">{{ this.$t("shared.no-image") }}</p>
        </div>
        <div class="text-left px-10 py-5">
          <p class="mb-0 text-2xl font-bold">
            {{ formatFullname(userData.firstName, userData.lastName) }}
          </p>
          <p class="text-md">@{{ userData.username }}</p>
          <table class="mt-5 w-max">
            <tr>
              <th class="pr-2 font-medium">{{ this.$t("shared.email") }}:</th>
              <td>
                <a :href="'mailto:' + userData.email">{{ userData.email }}</a>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
