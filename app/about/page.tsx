import Link from "next/link";

export default function AboutPage() {
  return (
    <main
      style={{
        padding: "2rem",
        fontFamily: "sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1>About Page</h1>
      <p>
        This is a simple About page to test routing in your Next.js app. 
        You built this using the new App Router in Next 16! 🎉
      </p>

      <Link
        href="/"
        style={{
          display: "inline-block",
          marginTop: "1.5rem",
          padding: "0.75rem 1.5rem",
          background: "#0070f3",
          color: "white",
          borderRadius: "6px",
          textDecoration: "none",
        }}
      >
        Back to Home
      </Link>
    </main>
  );
}
