<script lang="ts">
export default {
  name: "NavbarComponent",
  props: ["isDarkMode", "routeName", "user"],
  setup(props: {}, { emit }: any) {
    const onToggleTheme = () => {
      emit("toggleDarkMode");
    };
    return { onToggleTheme };
  },
};
</script>
<template>
  <header
    class="header fixed top-0 left-0 w-full shadow-md bg-white bg-5 dark:text-white"
  >
    <nav class="navbar h-full flex flex-row items-center">
      <label
        for="default-toggle"
        class="inline-flex relative items-center cursor-pointer ml-5"
      >
        <input
          type="checkbox"
          :checked="isDarkMode"
          id="default-toggle"
          class="sr-only peer"
          @click="onToggleTheme"
        />
        <div
          class="w-11 h-6 bg-slate-800 dark:bg-gray-200 dark:after:border-gray-300 after:bg-gray-50 :focus:outline-none peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-300"
        ></div>
        <span
          class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
          >{{
            isDarkMode
              ? this.$t("components.navbar.light-mode")
              : this.$t("components.navbar.dark-mode")
          }}</span
        >
      </label>
      <div class="w-auto flex flex-row absolute right-0 mr-5">
        <router-link
          v-if="user?.userStatus.isAuthor"
          class="nav-item"
          :class="routeName === 'createPost' ? 'nav-item-active' : ''"
          :to="{ name: 'createPost' }"
        >
          <font-awesome-icon icon="fa-regular fa-square-plus" />
        </router-link>
        <router-link
          class="nav-item"
          :class="routeName === 'posts' ? 'nav-item-active' : ''"
          :to="{ name: 'posts' }"
        >
          {{ this.$t("shared.posts-title") }}
        </router-link>
        <router-link
          v-if="user?.isSuperuser"
          class="nav-item"
          :class="routeName === 'authorRequests' ? 'nav-item-active' : ''"
          :to="{ name: 'authorRequests' }"
        >
          {{ this.$t("shared.author-request-title") }}
        </router-link>
        <router-link
          v-if="user"
          class="nav-item"
          :class="routeName === 'userPosts' ? 'nav-item-active' : ''"
          :to="{ name: 'userPosts' }"
        >
          My Posts
        </router-link>
        <router-link
          v-if="user"
          class="nav-item"
          :class="routeName === 'profile' ? 'nav-item-active' : ''"
          :to="{ name: 'profile' }"
        >
          {{ user.username }}
        </router-link>
        <router-link
          v-else
          class="nav-item"
          :class="routeName === 'login' ? 'nav-item-active' : ''"
          :to="{ name: 'login' }"
        >
          {{ this.$t("components.navbar.login") }}
        </router-link>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header {
  height: 9vh;
  z-index: 100;
}
.nav-item {
  transition: background-color 100ms;
  @apply pt-2 pr-5 pb-2 pl-5 mt-0 mr-1 mb-0 ml-1 leading-5 font-bold text-center hover:cursor-pointer hover:bg-zinc-200 dark:hover:bg-gray-700 dark:border-white;
}
.nav-item:hover {
  border-bottom: 1px solid;
  padding-bottom: calc(0.5rem - 1px);
}
.nav-item-active {
  border-bottom: 1px solid;
  padding-bottom: calc(0.5rem - 1px);
}
</style>
