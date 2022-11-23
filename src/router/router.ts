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
import { requireLogin } from "./guards/requireLogin";
import { requireAuthorPermission } from "./guards/requireAuthorPermission";

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
    beforeEnter: [requireLogin],
  },
  {
    path: "/posts/:category?:tags?:page?",
    name: "posts",
    component: PostsOverviewContainer,
  },
  {
    path: "/posts/:slug",
    name: "postDetail",
    component: PostDetailContainer,
  },
  {
    path: "/create-post",
    name: "createPost",
    component: CreatePostFormContainer,
    beforeEnter: [requireLogin, requireAuthorPermission],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
