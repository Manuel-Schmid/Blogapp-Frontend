import { usePostStore } from "../../store/blog";
import { RouteLocationNormalized } from "vue-router";

const fetchCategoriesGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  await usePostStore().fetchCategories();
};

export { fetchCategoriesGuard };
