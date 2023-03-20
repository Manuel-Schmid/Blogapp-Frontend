import { RouteLocationNormalized } from "vue-router";
import { usePostStore } from "../../store/blog";

const fetchUserSubscriptionsGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  await usePostStore().fetchUserSubscriptions();
};

export { fetchUserSubscriptionsGuard };
