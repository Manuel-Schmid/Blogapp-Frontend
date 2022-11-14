import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  DefaultOptions,
  InMemoryCache,
} from "@apollo/client/core";
import { createUploadLink } from "apollo-upload-client";

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

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    createUploadLink({
      uri: import.meta.env.VITE_GRAPHQL_API_URL,
      credentials: "include",
    }),
  ]),
  cache,
  defaultOptions,
});
