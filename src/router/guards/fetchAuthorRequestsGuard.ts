import { RouteLocationNormalized } from "vue-router";
import { usePostStore } from "../../store/blog";

const fetchAuthorRequestsGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  const activePage: number = to.query.page ? +to.query.page : 1;
  // todo: status
  await usePostStore().fetchAuthorRequests(undefined, activePage);
  return true;
};

export { fetchAuthorRequestsGuard };
