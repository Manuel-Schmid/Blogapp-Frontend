import { defineStore } from "pinia";
import { apolloClient } from "../api/client";
import router from "../router/router";
import FetchRefreshToken from "../graphql/fetchRefreshToken.gql";
import GetUser from "../graphql/getUser.gql";
import DeleteTokenCookie from "../graphql/deleteTokenCookie.gql";
import DeleteRefreshTokenCookie from "../graphql/deleteRefreshTokenCookie.gql";
import SendPasswordResetEmail from "../graphql/sendPasswordResetEmail.gql";
import SendEmailChangeEmail from "../graphql/sendEmailChangeEmail.gql";
import PasswordReset from "../graphql/passwordReset.gql";
import PasswordChange from "../graphql/passwordChange.gql";
import EmailChange from "../graphql/emailChange.gql";
import Register from "../graphql/register.gql";
import VerifyAccount from "../graphql/verifyAccount.gql";
import ResendActivationEmail from "../graphql/resendActivationEmail.gql";
import UpdateAccount from "../graphql/updateAccount.gql";
import AuthorRequestByUser from "../graphql/getAuthorRequestByUser.gql";
import CreateAuthorRequest from "../graphql/createAuthorRequest.gql";
import UseRefreshToken from "../graphql/useRefreshToken.gql";
import UpdateUserProfile from "../graphql/updateUserProfile.gql";
import {
  AuthorRequest,
  EmailChangeInput,
  PasswordChangeInput,
  PasswordResetInput,
  UpdateAccountInput,
  User,
  UserProfileInput,
  UserRegistrationInput,
} from "../api/models";
import { updateTheme } from "../helper/layout";

export type AuthState = {
  refreshToken: string | null;
  user: User | null;
  authorRequest: AuthorRequest | null;
};

export const useAuthStore = defineStore("auth", {
  state: () =>
    ({
      refreshToken: null,
      user: null,
      authorRequest: null,
    } as AuthState),
  persist: {
    enabled: true,
  },
  actions: {
    async fetchRefreshToken(username: String, password: String) {
      try {
        const response = await apolloClient.mutate({
          mutation: FetchRefreshToken,
          variables: {
            username: username,
            password: password,
          },
        });
        this.refreshToken = response.data.tokenAuth.refreshToken;
        await this.fetchUser();
        await this.fetchAuthorRequestByUser();
        return true;
      } catch (e: any) {
        return e.graphQLErrors[0].extensions.code;
      }
    },
    async useRefreshToken() {
      const response = await apolloClient.mutate({
        mutation: UseRefreshToken,
        variables: {
          refreshToken: this.refreshToken,
        },
      });
      if (response.data !== null) {
        this.refreshToken = response.data.refreshToken.refreshToken;
      }
    },
    async fetchUser() {
      const response = await apolloClient.query({
        query: GetUser,
      });
      if (response.data !== null) {
        this.user = response.data.user;
        updateTheme();
      } else {
        // todo
      }
    },
    async logoutUser() {
      this.user = this.refreshToken = null;
      // delete cookies
      const ResponseDeleteTokenCookie = await apolloClient.query({
        query: DeleteTokenCookie,
      });
      const ResponseDeleteRefreshTokenCookie = await apolloClient.query({
        query: DeleteRefreshTokenCookie,
      });
      if (
        ResponseDeleteTokenCookie.data.deleteTokenCookie.deleted &&
        ResponseDeleteRefreshTokenCookie.data.deleteRefreshTokenCookie.deleted
      ) {
        await apolloClient.resetStore();
      }
      updateTheme();
      await router.push({ name: "login" });
    },
    async registerUser(userRegistrationInput: UserRegistrationInput) {
      const response = await apolloClient.query({
        query: Register,
        variables: {
          userRegistrationInput,
        },
      });
      return response.data.register.success;
    },
    async resendActivationEmail(email: string) {
      const response = await apolloClient.query({
        query: ResendActivationEmail,
        variables: {
          email,
        },
      });
      return response.data.resendActivationEmail.success;
    },
    async verifyAccount(token: string) {
      const response = await apolloClient.query({
        query: VerifyAccount,
        variables: {
          token,
        },
      });
      return response.data.verifyAccount.success;
    },
    async sendEmailChangeEmail(email: string) {
      const response = await apolloClient.query({
        query: SendEmailChangeEmail,
        variables: {
          email,
        },
      });
      return response.data.sendEmailChangeEmail.success;
    },
    async sendResetPasswordEmail(email: string) {
      const response = await apolloClient.query({
        query: SendPasswordResetEmail,
        variables: {
          email,
        },
      });
      if (response.data != null) {
        return response.data.sendPasswordResetEmail.success;
      } else return false;
    },
    async resetPassword(passwordResetInput: PasswordResetInput) {
      const response = await apolloClient.query({
        query: PasswordReset,
        variables: {
          passwordResetInput,
        },
      });
      return response.data.passwordReset.success;
    },
    async updateAccount(updateAccountInput: UpdateAccountInput) {
      const response = await apolloClient.query({
        query: UpdateAccount,
        variables: {
          updateAccountInput,
        },
      });
      await this.fetchUser();
      return response.data.updateAccount.success;
    },
    async changePassword(passwordChangeInput: PasswordChangeInput) {
      const response = await apolloClient.query({
        query: PasswordChange,
        variables: {
          passwordChangeInput,
        },
      });
      return response.data.passwordChange.success;
    },
    async changeEmail(emailChangeInput: EmailChangeInput) {
      const response = await apolloClient.query({
        query: EmailChange,
        variables: {
          emailChangeInput,
        },
      });
      if (response.data.emailChange.success) {
        this.user = response.data.emailChange.user;
        return true;
      }
      return false;
    },
    async fetchAuthorRequestByUser() {
      const response = await apolloClient.query({
        query: AuthorRequestByUser,
      });
      if (response.data.authorRequestByUser !== null) {
        this.authorRequest = response.data.authorRequestByUser;
        if (response.data.authorRequestByUser.status === "ACCEPTED") {
          await this.fetchUser();
        }
      } else {
        this.authorRequest = null;
      }
    },
    async createAuthorRequest() {
      const response = await apolloClient.mutate({
        mutation: CreateAuthorRequest,
      });
      if (response.data.createAuthorRequest?.success) {
        this.authorRequest = response.data.createAuthorRequest.authorRequest;
      }
    },
    async updateUserProfile(userProfileInput: UserProfileInput) {
      if (this.user) {
        const response = await apolloClient.mutate({
          mutation: UpdateUserProfile,
          variables: {
            userProfileInput,
          },
        });
        if (response.data.updateUserProfile.success) {
          this.user.profile = response.data.updateUserProfile.profile;
        }
        return response.data.updateUserProfile.success;
      }
    },
  },
});
