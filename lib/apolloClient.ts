import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "cross-fetch";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://headless-wp.local/graphql", // your WordPress GraphQL endpoint
    fetch,
  }),
  cache: new InMemoryCache(),
});

export default client;
