import { useAuthStore } from "../../store/auth";
import { RouteLocationNormalized } from "vue-router";

const requireLoginGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  return !!useAuthStore().user ? true : { name: "login" };
};

export { requireLoginGuard };
