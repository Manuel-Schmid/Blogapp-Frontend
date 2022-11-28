import { RouteLocationNormalized } from "vue-router";
import { usePostStore } from "../../store/blog";

const fetchPostGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  await usePostStore().fetchPost(to.params.slug as string, true);
};

export { fetchPostGuard };
