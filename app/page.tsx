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

  const posts = data.posts.edges;
  const pages = data.pages.edges;

  // ✅ Make sure you return JSX
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>WordPress Headless Blog</h1>

      <h2>📰 Posts</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post: any) => (
          <div key={post.node.id}>
            <h3>{post.node.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
          </div>
        ))
      )}

      <h2 style={{ marginTop: "2rem" }}>📄 Pages</h2>
      {pages.length === 0 ? (
        <p>No pages found.</p>
      ) : (
        pages.map((page: any) => (
          <div key={page.node.id}>
            <h3>{page.node.title}</h3>
            <p>Slug: {page.node.slug}</p>
          </div>
        ))
      )}
    </main>
  );
}
