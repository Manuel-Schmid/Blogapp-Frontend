import {
  ApolloClient,
  ApolloLink,
  DefaultOptions,
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

const cache = new InMemoryCache();

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.log(`[GraphQL error]: Message: ${message}`);
      switch (extensions.code) {
        case "PERMISSION_DENIED": {
          useAuthStore().useRefreshToken();
          break;
        }
      }
    });
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
