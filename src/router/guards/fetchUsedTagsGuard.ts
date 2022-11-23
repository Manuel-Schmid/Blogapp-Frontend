import { RouteLocationNormalized } from "vue-router";
import { usePostStore } from "../../store/blog";

const fetchUsedTagsGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  const category = to.query.category as string;
  await usePostStore().fetchUsedTags(category);
};

export { fetchUsedTagsGuard };
