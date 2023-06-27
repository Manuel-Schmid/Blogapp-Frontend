import { RouteLocationNormalized } from "vue-router";
import { usePostStore } from "../../store/blog";
import { cleanSubscriptionSort } from "../../helper/helper";

const fetchUserSubscriptionsGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  await usePostStore().fetchUserSubscriptions(
    cleanSubscriptionSort(to.query.sort ? String(to.query.sort) : "")
  );
};

export { fetchUserSubscriptionsGuard };
