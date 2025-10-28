import client from "../lib/apolloClient";
import { gql } from "@apollo/client";

export default async function HomePage() {
  // Load the WordPress URL from the environment variable.
  // Each user sets their own endpoint inside `.env.local`.
  // Example:
  // NEXT_PUBLIC_WORDPRESS_API_URL=http://your-wp-site.com/graphql
  const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  // If no URL is provided, show a helpful message instead of crashing.
  if (!wordpressUrl) {
    return (
      <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>WordPress Headless Blog</h1>
        <p>
          No WordPress endpoint configured. <br />
          Please set <code>NEXT_PUBLIC_WORDPRESS_API_URL</code> in your <code>.env.local</code> file.
        </p>
      </main>
    );
  }

  try {
    const { data } = await client.query({
      query: gql`
        {
          posts {
            edges {
              node {
                id
                title
                excerpt
              }
            }
          }
          pages {
            edges {
              node {
                id
                title
                slug
              }
            }
          }
        }
      `,
    });

    // Type assertion for better TypeScript compatibility
    const typedData = data as {
      posts: { edges: { node: { id: string; title: string; excerpt: string } }[] };
      pages: { edges: { node: { id: string; title: string; slug: string } }[] };
    };

    const posts = typedData.posts.edges;
    const pages = typedData.pages.edges;

    return (
      <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>WordPress Headless Blog</h1>

        <h2>Posts</h2>
        {posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          posts.map((post) => (
            <div key={post.node.id}>
              <h3>{post.node.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
            </div>
          ))
        )}

        <h2 style={{ marginTop: "2rem" }}>Pages</h2>
        {pages.length === 0 ? (
          <p>No pages found.</p>
        ) : (
          pages.map((page) => (
            <div key={page.node.id}>
              <h3>{page.node.title}</h3>
              <p>Slug: {page.node.slug}</p>
            </div>
          ))
        )}
      </main>
    );
  } catch (error) {
    // If the WordPress endpoint is offline or unreachable during build/runtime.
    console.error("Failed to fetch WordPress data:", error);
    return (
      <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>WordPress Headless Blog</h1>
        <p>Content is temporarily unavailable. Please try again later.</p>
      </main>
    );
  }
}
