<script lang="ts">
import { useRoute } from "vue-router";

export default {
  name: "FilterComponent",
  props: ["filterItems", "queryKey", "multiselect"],

  setup(props: { queryKey: string }) {
    const route = useRoute();

    const isFilterSelected = (filterItemSlug: string) => {
      return route.query[props.queryKey]
        ?.toString()
        .split(",")
        .includes(filterItemSlug);
    };

    const filterDeselectLocation = (filterItemSlug: string) => {
      console.log(filterItemSlug);
      return {
        name: route.name,
        query: {
          ...route.query,
          [props.queryKey]: route.query[props.queryKey]?.includes(",")
            ? route.query[props.queryKey]
                ?.toString()
                .replace(filterItemSlug + ",", "")
                .replace("," + filterItemSlug, "")
                .replace(filterItemSlug, "")
            : undefined,
          page: undefined,
        },
      };
    };

    const filterSelectLocation = (
      filterItemSlug: string,
      multiselect: boolean
    ) => {
      return multiselect
        ? {
            name: route.name,
            query: {
              ...route.query,
              [props.queryKey]: route.query[props.queryKey]
                ? route.query[props.queryKey] + "," + filterItemSlug
                : filterItemSlug,
              page: undefined,
            },
          }
        : {
            name: route.name,
            query: {
              [props.queryKey]: filterItemSlug,
              page: undefined,
            },
          };
    };

    return {
      route,
      isFilterSelected,
      filterSelectLocation,
      filterDeselectLocation,
    };
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
          v-if="isFilterSelected(filterItem.slug)"
          class="filter-link bg-2"
          :to="filterDeselectLocation(filterItem.slug)"
        >
          <p class="m-0">{{ filterItem.name }}</p>
        </router-link>
        <router-link
          v-else
          class="filter-link bg-1 hover:bg-2"
          :to="filterSelectLocation(filterItem.slug, multiselect)"
        >
          <p class="m-0">{{ filterItem.name }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-link {
  @apply rounded-3xl pt-1 pr-4 pb-1 pl-4 m-1 float-left text-black no-underline dark:text-white cursor-pointer;
}
</style>
