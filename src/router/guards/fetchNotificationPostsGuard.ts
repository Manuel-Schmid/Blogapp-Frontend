import { RouteLocationNormalized } from "vue-router";
import { usePostStore } from "../../store/blog";

const fetchNotificationPostsGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  const activePage: number = to.query.page ? +to.query.page : 1;
  await usePostStore().fetchNotificationPosts(activePage);
  return true;
};

export { fetchNotificationPostsGuard };
