import { RouteLocationNormalized } from "vue-router";
import { usePostStore } from "../../store/blog";

const fetchUserPostsGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  const activePage: number = to.query.page ? +to.query.page : 1;
  await usePostStore().fetchUserPosts(activePage);
  return true;
};

export { fetchUserPostsGuard };
