<script>
import NavbarContainer from "./container/NavbarContainer.vue";

export default {
  components: {
    NavbarContainer,
  },
};
</script>

<template>
  <NavbarContainer />
  <router-view :key="this.$route.fullPath" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
html,
body {
  margin: 0;
}
</style>
