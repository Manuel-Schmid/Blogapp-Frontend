import { useAuthStore } from "../../store/auth";

const requireLogin = (to: any, from: any) => {
  return !!useAuthStore().user ? true : { name: "login" };
};

export { requireLogin };
