import { RouteLocationNormalized } from "vue-router";
import { usePostStore } from "../../store/blog";

const fetchPostsGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  const activePage: number = to.query.page ? +to.query.page : 1;
  const tags = to.query.tags as string;
  const category = to.query.category as string;
  await usePostStore().fetchPosts(tags, category, activePage);
  return true;
};

export { fetchPostsGuard };
