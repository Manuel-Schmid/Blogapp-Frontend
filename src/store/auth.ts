import { defineStore } from "pinia";
import { apolloClient } from "../api/client";
import router from "../router/router";
import FetchRefreshToken from "../graphql/fetchRefreshToken.gql";
import User from "../graphql/getUser.gql";
import DeleteTokenCookie from "../graphql/deleteTokenCookie.gql";
import DeleteRefreshTokenCookie from "../graphql/deleteRefreshTokenCookie.gql";
import SendPasswordResetEmail from "../graphql/sendPasswordResetEmail.gql";
import SendEmailChangeEmail from "../graphql/sendEmailChangeEmail.gql";
import PasswordReset from "../graphql/passwordReset.gql";
import PasswordChange from "../graphql/passwordChange.gql";
import UpdateUserEmail from "../graphql/updateUserEmail.gql";
import Register from "../graphql/register.gql";
import VerifyAccount from "../graphql/verifyAccount.gql";
import ResendActivationEmail from "../graphql/resendActivationEmail.gql";
import UpdateAccount from "../graphql/updateAccount.gql";
import {
  PasswordChangeInput,
  PasswordResetInput,
  UserRegistrationInput,
} from "../api/models";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    refreshToken: null,
    user: null,
  }),
  persist: {
    enabled: true,
  },
  actions: {
    async fetchRefreshToken(username: String, password: String) {
      const response = await apolloClient.mutate({
        mutation: FetchRefreshToken,
        variables: {
          username: username,
          password: password,
        },
      });
      if (response.data !== null) {
        this.refreshToken = response.data.tokenAuth.refreshToken;
        await this.fetchUser();
        await router.push({ name: "posts" });
      } else {
        // todo
      }
    },
    async fetchUser() {
      this.user = null;
      const response = await apolloClient.query({
        query: User,
      });
      if (response.data !== null) {
        this.user = response.data.user;
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
    },
    async registerUser(userRegistrationInput: UserRegistrationInput) {
      const response = await apolloClient.query({
        query: Register,
        variables: {
          userRegistrationInput: userRegistrationInput,
        },
      });
      return response.data.register.success;
    },
    async resendActivationEmail(email: string) {
      const response = await apolloClient.query({
        query: ResendActivationEmail,
        variables: {
          email: email,
        },
      });
      return response.data.resendActivationEmail.errors;
    },
    async verifyAccount(token: string) {
      const response = await apolloClient.query({
        query: VerifyAccount,
        variables: {
          token: token,
        },
      });
      return response.data.verifyAccount.success;
    },
    async sendEmailChangeEmail(email: string) {
      const response = await apolloClient.query({
        query: SendEmailChangeEmail,
        variables: {
          email: email,
        },
      });
      return response.data.sendEmailChangeEmail.success;
    },
    async sendResetPasswordEmail(email: string) {
      const response = await apolloClient.query({
        query: SendPasswordResetEmail,
        variables: {
          email: email,
        },
      });
      return response.data.sendPasswordResetEmail.success;
    },
    async resetPassword(passwordResetInput: PasswordResetInput) {
      const response = await apolloClient.query({
        query: PasswordReset,
        variables: {
          passwordResetInput: passwordResetInput,
        },
      });
      return response.data.passwordReset.success;
    },
    async updateAccount(firstName: string, lastName: string) {
      const response = await apolloClient.query({
        query: UpdateAccount,
        variables: {
          firstName: firstName,
          lastName: lastName,
        },
      });
      await this.fetchUser();
      return response.data.updateAccount.success;
    },
    async changePassword(passwordChangeInput: PasswordChangeInput) {
      const response = await apolloClient.query({
        query: PasswordChange,
        variables: {
          passwordChangeInput: passwordChangeInput,
        },
      });
      return response.data.passwordChange.success;
    },
    async changeEmail(newEmail: string) {
      const response = await apolloClient.query({
        query: UpdateUserEmail,
        variables: {
          newEmail: newEmail,
        },
      });
      if (response.data.updateUserEmail.success) {
        this.user = response.data.updateUserEmail.user;
        return true;
      }
      return false;
    },
  },
});
