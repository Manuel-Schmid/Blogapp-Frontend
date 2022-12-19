<script>
import { useRoute } from "vue-router";

export default {
  name: "FilterComponent",
  props: ["filterItems", "queryKey", "multiselect"],

  setup() {
    const route = useRoute();
    return { route };
  },
};
</script>

<template>
  <div class="mb-2 px-10" v-if="filterItems">
    <p class="mb-0 font-bold">
      {{
        queryKey === "category"
          ? this.$t("shared.category")
          : this.$t("shared.tags")
      }}:
    </p>
    <div class="mt-2 inline-block items-center justify-center">
      <div
        v-for="filterItem in filterItems"
        :key="filterItem.slug"
        class="float-left"
      >
        <router-link
          v-if="route.query[queryKey]?.split(',').includes(filterItem.slug)"
          class="tag-link bg-2"
          :to="{
            name: route.name,
            query: {
              ...route.query,
              [queryKey]: route.query[queryKey].includes(',')
                ? route.query[queryKey]
                    .replace(filterItem.slug + ',', '')
                    .replace(',' + filterItem.slug, '')
                    .replace(filterItem.slug, '')
                : undefined,
              page: undefined,
            },
          }"
        >
          <p class="m-0">{{ filterItem.name }}</p>
        </router-link>
        <router-link
          v-else
          class="tag-link bg-1 hover:bg-1"
          :to="
            multiselect
              ? {
                  name: route.name,
                  query: {
                    ...route.query,
                    [queryKey]: route.query[queryKey]
                      ? route.query[queryKey] + ',' + filterItem.slug
                      : filterItem.slug,
                    page: undefined,
                  },
                }
              : {
                  name: route.name,
                  query: {
                    [queryKey]: filterItem.slug,
                    page: undefined,
                  },
                }
          "
        >
          <p class="m-0">{{ filterItem.name }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tag-link {
  @apply rounded-3xl pt-1 pr-4 pb-1 pl-4 m-1 float-left text-black no-underline dark:text-white cursor-pointer;
}
</style>
