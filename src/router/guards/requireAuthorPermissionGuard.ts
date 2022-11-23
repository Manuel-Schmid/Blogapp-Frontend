import { useAuthStore } from "../../store/auth";
import { RouteLocationNormalized } from "vue-router";

const requireAuthorPermissionGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  // @ts-ignore
  return useAuthStore().user.userStatus.isAuthor
    ? true
    : !!from.name
    ? false
    : { name: "posts" };
};

export { requireAuthorPermissionGuard };
