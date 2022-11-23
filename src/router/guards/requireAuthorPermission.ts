import { useAuthStore } from "../../store/auth";

const requireAuthorPermission = (to: any, from: any) => {
  // @ts-ignore
  return useAuthStore().user.userStatus.isAuthor
    ? true
    : !!from.name
    ? false
    : { name: "posts" };
};

export { requireAuthorPermission };
