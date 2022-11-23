import { useAuthStore } from "../../store/auth";
import { RouteLocationNormalized } from "vue-router";

const fetchUserGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  await useAuthStore().fetchUser();
};

export { fetchUserGuard };
