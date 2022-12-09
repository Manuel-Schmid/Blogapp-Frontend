import { createRouter, createWebHistory } from "vue-router";
import PostsOverviewContainer from "../container/PostsOverviewContainer.vue";
import PostDetailContainer from "../container/PostDetailContainer.vue";
import ProfileContainer from "../container/ProfileContainer.vue";
import LoginContainer from "../container/LoginContainer.vue";
import PasswordResetFormContainer from "../container/PasswordResetFormContainer.vue";
import ResetEmailFormContainer from "../container/ResetEmailFormContainer.vue";
import RegistrationContainer from "../container/RegistrationContainer.vue";
import EmailChangeFormContainer from "../container/EmailChangeFormContainer.vue";
import ActivationContainer from "../container/ActivationContainer.vue";
import RegistrationConfirmationContainer from "../container/RegistrationConfirmationContainer.vue";
import CreatePostFormContainer from "../container/CreatePostFormContainer.vue";
import { requireLoginGuard } from "./guards/requireLoginGuard";
import { requireAuthorPermissionGuard } from "./guards/requireAuthorPermissionGuard";
import { fetchUserGuard } from "./guards/fetchUserGuard";
import { fetchPostsGuard } from "./guards/fetchPostsGuard";
import { fetchUsedTagsGuard } from "./guards/fetchUsedTagsGuard";
import { fetchCategoriesGuard } from "./guards/fetchCategoriesGuard";
import { fetchPostGuard } from "./guards/fetchPostGuard";
import AuthorRequestOverviewContainer from "../container/AuthorRequestOverviewContainer.vue";
import { fetchAuthorRequestsGuard } from "./guards/fetchAuthorRequestsGuard";
import { fetchUserPostsGuard } from "./guards/fetchUserPostsGuard";
import UserPostsContainer from "../container/UserPostsContainer.vue";

const routes: any = [
  {
    path: "/login/:verified?",
    name: "login",
    component: LoginContainer,
  },
  {
    path: "/activate/:token",
    name: "activation",
    component: ActivationContainer,
  },
  {
    path: "/signup",
    name: "registration",
    component: RegistrationContainer,
  },
  {
    path: "/signup-confirmation",
    name: "registrationConfirmation",
    component: RegistrationConfirmationContainer,
  },
  {
    path: "/email-change/:token",
    name: "emailChange",
    component: EmailChangeFormContainer,
  },
  {
    path: "/password-reset/:token",
    name: "passwordReset",
    component: PasswordResetFormContainer,
  },
  {
    path: "/reset-email",
    name: "resetEmailForm",
    component: ResetEmailFormContainer,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileContainer,
    beforeEnter: [requireLoginGuard, fetchUserGuard],
  },
  {
    path: "/posts/:category?:tags?:page?",
    name: "posts",
    component: PostsOverviewContainer,
    beforeEnter: [fetchPostsGuard, fetchUsedTagsGuard], // when changing this also change onBeforeRouteUpdate() in PostsOverviewContainer.vue
  },
  {
    path: "/posts/:slug",
    name: "postDetail",
    component: PostDetailContainer,
    beforeEnter: [fetchPostGuard],
  },
  {
    path: "/my-posts",
    name: "userPosts",
    component: UserPostsContainer,
    beforeEnter: [fetchUserPostsGuard],
  },
  {
    path: "/create-post",
    name: "createPost",
    component: CreatePostFormContainer,
    beforeEnter: [
      requireLoginGuard,
      requireAuthorPermissionGuard,
      fetchCategoriesGuard,
    ],
  },
  {
    path: "/author-requests",
    name: "authorRequests",
    component: AuthorRequestOverviewContainer,
    beforeEnter: [fetchAuthorRequestsGuard], // when changing this also change onBeforeRouteUpdate() AuthorRequestOverviewContainer.vue
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
