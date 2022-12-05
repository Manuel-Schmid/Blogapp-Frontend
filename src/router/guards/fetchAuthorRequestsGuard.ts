import { RouteLocationNormalized } from "vue-router";
import { usePostStore } from "../../store/blog";

const fetchAuthorRequestsGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  const activePage: number = to.query.page ? +to.query.page : 1;
  const status: string = to.query.status ? String(to.query.status) : "";
  await usePostStore().fetchAuthorRequests(status, activePage);
  return true;
};

export { fetchAuthorRequestsGuard };
