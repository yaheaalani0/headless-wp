import client from "../lib/apolloClient";
import { gql } from "@apollo/client";

export default async function HomePage() {
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

  // Type assertion to satisfy TypeScript
  const typedData = data as {
    posts: { edges: { node: { id: string; title: string; excerpt: string } }[] };
    pages: { edges: { node: { id: string; title: string; slug: string } }[] };
  };

  const posts = typedData.posts.edges;
  const pages = typedData.pages.edges;

  // ✅ Return JSX inside the function body
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
}
