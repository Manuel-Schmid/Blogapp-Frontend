import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import graphql from "@rollup/plugin-graphql";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), graphql()],
  server: {
    host: "127.0.0.1",
    port: 8080,
    open: "http://frontend.blogapp.com:8080",
  },
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: true,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
});
