import { RouteLocationNormalized } from "vue-router";
import { usePostStore } from "../../store/blog";

const fetchUserDetailGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  await usePostStore().fetchUserDetail(to.params.username as string);
};

export { fetchUserDetailGuard };
