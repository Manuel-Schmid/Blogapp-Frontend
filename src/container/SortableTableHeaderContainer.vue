<script lang="ts">
import SortableTableHeaderComponent from "../components/SortableTableHeaderComponent.vue";
import router from "../router/router";
import { useRoute } from "vue-router";

export default {
  name: "SortableTableHeaderContainer",
  components: { SortableTableHeaderComponent },
  props: ["text", "sortParam"],

  setup() {
    const route = useRoute();
    let selectedSort = route.query.sort ? String(route.query.sort) : "";

    const orderBy = (sortParam: string) => {
      const query = {
        ...route.query,
        sort: sortParam ? sortParam : undefined,
      };

      router.push({
        name: String(route.name),
        query: query,
      });
    };

    return { selectedSort, orderBy };
  },
};
</script>

<template>
  <SortableTableHeaderComponent
    :text="text"
    :sort-param="sortParam"
    :selected-sort="selectedSort"
    @order-by="orderBy"
  ></SortableTableHeaderComponent>
</template>
