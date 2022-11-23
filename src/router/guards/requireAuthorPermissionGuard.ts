import { useAuthStore } from "../../store/auth";
import { RouteLocationNormalized } from "vue-router";

const requireAuthorPermissionGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  const user = useAuthStore().user;
  if (user === null) return false;
  return user["userStatus"]["isAuthor"]
    ? true
    : !!from.name
    ? false
    : { name: "posts" };
};

export { requireAuthorPermissionGuard };
