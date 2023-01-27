import { RouteLocationNormalized } from "vue-router";
import { usePostStore } from "../../store/blog";

const fetchPostTitlesGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  await usePostStore().fetchPostTitles();
  return true;
};

export { fetchPostTitlesGuard };
