import {
  ApolloClient,
  ApolloLink,
  DefaultOptions,
  fromPromise,
  InMemoryCache,
} from "@apollo/client/core";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "@apollo/client/link/error";
import { useAuthStore } from "../store/auth";

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const cache = new InMemoryCache({ addTypename: false });

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors)
    for (const { extensions } of graphQLErrors) {
      switch (extensions.code) {
        case "PERMISSION_DENIED":
          return fromPromise(useAuthStore().useRefreshToken()).flatMap(() => {
            return forward(operation);
          });
        case "TOKEN_INVALID":
          void useAuthStore().logoutUser();
      }
    }
  return;
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    createUploadLink({
      uri: import.meta.env.VITE_GRAPHQL_API_URL,
      credentials: "include",
    }),
  ]),
  cache,
  defaultOptions,
});
