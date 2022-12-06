<script lang="ts">
export default {
  name: "SortableTableHeaderComponent",
  props: ["text", "selectedSort", "sortParam"],
  emits: ["orderBy"],
  setup(props: {}, { emit }: any) {
    const onClick = (sortParam: string) => {
      emit("orderBy", sortParam);
    };

    return { onClick };
  },
};
</script>

<template>
  <div
    v-if="!selectedSort.includes(sortParam)"
    @click="onClick(sortParam)"
    class="cursor-pointer"
  >
    {{ text }}
    <font-awesome-icon icon="fa-solid fa-sort" class="sort-icon" />
  </div>
  <div
    v-if="selectedSort === sortParam"
    @click="onClick('-' + sortParam)"
    class="cursor-pointer"
  >
    {{ text }}
    <font-awesome-icon icon="fa-solid fa-sort-up" class="sort-icon" />
  </div>
  <div
    v-if="selectedSort === '-' + sortParam"
    @click="onClick('')"
    class="cursor-pointer"
  >
    {{ text }}
    <font-awesome-icon icon="fa-solid fa-sort-down" class="sort-icon" />
  </div>
</template>

<style scoped>
.sort-icon {
  @apply ml-2;
}
</style>
