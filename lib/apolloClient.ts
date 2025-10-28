import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "cross-fetch";

// Apollo Client connects your Next.js app to a WordPress GraphQL endpoint.
// The URL is loaded from the environment variable in `.env.local`.
//
// Example:
// NEXT_PUBLIC_WORDPRESS_API_URL=http://your-wp-site.com/graphql
//
// This makes the project reusable — anyone can clone it and plug in their own WP URL.

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL, // 👈 WordPress GraphQL endpoint (from .env.local)
    fetch,
  }),
  cache: new InMemoryCache(),
});

export default client;
