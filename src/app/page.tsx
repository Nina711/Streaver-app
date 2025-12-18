import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ marginTop: "100px", textAlign: "center" }}>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>
          Streaver challenge app
        </h1>

        <p style={{ marginBottom: 24 }}>
          This app allows users to list posts from an API and filter them by userId.
        </p>

        <Link
          href="/posts"
          style={{
            display: "inline-block",
            padding: "12px 20px",
            backgroundColor: "#F875AA",
            color: "white",
            borderRadius: 8,
          }}
        >
          Go to the posts
        </Link>
      </div>
    </main>
  );
}
