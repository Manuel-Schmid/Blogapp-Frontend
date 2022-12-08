<script lang="ts">
import { useRoute } from "vue-router/dist/vue-router";

export default {
  name: "PaginationComponent",
  props: ["numPages", "activePage"],

  setup(props: { numPages: number; activePage: number }) {
    let numPagesList = Array.from({ length: props.numPages }, (x, i) => ++i);

    let paginationPageNums = slicePaginationPageNums(
      numPagesList,
      props.activePage
    );

    let firstPage = paginationPageNums.includes(1) ? 0 : 1;
    let lastPage = paginationPageNums.includes(props.numPages)
      ? 0
      : props.numPages;

    const route = useRoute();
    return { route, paginationPageNums, firstPage, lastPage };
  },
};

function slicePaginationPageNums(numPages: any, activePage: number) {
  return numPages.length > 7 && activePage > numPages.length - 4
    ? numPages.slice(numPages.length - 7, numPages.length)
    : numPages.length > 7 && numPages.length > 4 && activePage > 4
    ? numPages.slice(activePage - 4, activePage + 3)
    : numPages.slice(0, 7);
}
</script>

<template>
  <div class="float-left pagination-wrapper h-min my-10">
    <div class="m-auto w-max">
      <div
        class="pagination-link-wrapper mr-3 min-w-[72px]"
        :class="!firstPage && 'invisible'"
      >
        <router-link
          :to="{ name: route.name, query: { ...route.query, page: firstPage } }"
          class="pagination-special-link-wrapper"
        >
          <span class="pagination-special-link">
            <font-awesome-icon
              icon="fa-solid fa-arrow-left"
              class="float-left mr-2"
            />
            <span>{{ firstPage }}</span>
          </span>
        </router-link>
      </div>
      <div v-for="pageNr in paginationPageNums" class="pagination-link-wrapper">
        <span
          v-if="activePage === pageNr"
          class="pagination-link bg-2 cursor-default"
        >
          {{ pageNr }}
        </span>
        <router-link
          v-else
          :to="{ name: route.name, query: { ...route.query, page: pageNr } }"
          class="pagination-link bg-1 cursor-pointer"
        >
          {{ pageNr }}
        </router-link>
      </div>
      <div
        class="pagination-link-wrapper ml-3 min-w-[72px]"
        :class="!lastPage && 'invisible'"
      >
        <router-link
          :to="{ name: route.name, query: { ...route.query, page: lastPage } }"
          class="pagination-special-link-wrapper"
        >
          <span class="pagination-special-link">
            <span>{{ lastPage }}</span>
            <font-awesome-icon
              icon="fa-solid fa-arrow-right"
              class="float-right ml-2 leading-5"
            />
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pagination-wrapper {
  width: calc(100% - 50px);
}
.pagination-link {
  @apply rounded-3xl min-w-[1.75rem] px-2 h-7 text-black mx-1 text-center leading-[1.85rem] dark:text-white;
}
.pagination-link-wrapper {
  @apply float-left flex items-center justify-center;
}
.pagination-special-link-wrapper {
  @apply pagination-link cursor-pointer;
}
.pagination-special-link {
  @apply inline-block w-max leading-5;
}
</style>
