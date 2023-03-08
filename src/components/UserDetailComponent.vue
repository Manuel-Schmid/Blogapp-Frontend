<script lang="ts">
export default {
  name: "UserDetailComponent",
  props: ["userData"],

  setup() {
    return {};
  },
};
</script>

<template>
  <div class="site-container">
    {{ userData }}
  </div>
</template>

<style scoped></style>
