import { RouteLocationNormalized } from "vue-router";
import { usePostStore } from "../../store/blog";

const fetchAuthorRequestsGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  const activePage: number = to.query.page ? +to.query.page : 1;
  const status: string = to.query.status ? String(to.query.status) : "";
  let sort: string = to.query.sort ? String(to.query.sort) : "";
  sort = sort.replace("user", "user__username");
  await usePostStore().fetchAuthorRequests(status, sort, activePage);
  return true;
};

export { fetchAuthorRequestsGuard };
