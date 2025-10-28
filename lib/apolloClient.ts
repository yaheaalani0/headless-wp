import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "cross-fetch";

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://headless-wp.local/graphql",
    fetch,
  }),
  cache: new InMemoryCache(),
});

export default client;
