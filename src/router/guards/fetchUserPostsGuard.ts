import { RouteLocationNormalized } from "vue-router";
import { usePostStore } from "../../store/blog";
import { useAuthStore } from "../../store/auth";

const fetchUserPostsGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  const activePage: number = to.query.page ? +to.query.page : 1;
  await usePostStore().fetchUserPosts(useAuthStore().user, activePage);
  return true;
};

export { fetchUserPostsGuard };
