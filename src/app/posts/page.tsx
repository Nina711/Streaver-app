"use client";

import useSWR from "swr";
import { useState } from "react";
import { useDebounce } from "../lib/useDebounce";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function fetcher(url: string): Promise<Post[]> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error fetching posts");
  return res.json();
}

export default function PostsPage() {
  const [userIdInput, setUserIdInput] = useState("");
  const debouncedUserIdInput = useDebounce(userIdInput, 600);
  const userId = debouncedUserIdInput.trim();
  const url = userId ? `https://jsonplaceholder.typicode.com/posts?userId=${encodeURIComponent(userId)}` : "https://jsonplaceholder.typicode.com/posts";
  const { data, error, isLoading, isValidating } = useSWR<Post[]>(
    url,
    fetcher,
    {
      revalidateOnReconnect: true,
      shouldRetryOnError: true,
    }
  );

  if (isLoading) {
    return (
      <p style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>Loading posts...</p>
    );
  }

  if (error) {
    return (
      <p style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "crimson"
      }}>Error: {String(error.message || error)}</p>
    );
  }

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>

      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Posts</h1>

      <p style={{ opacity: 0.7, marginTop: 0, marginBottom: "8px" }}>
        {isValidating ? "Updating..." : "Done"}
      </p>

      <div style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
        <label style={{ display: "block", marginBottom: 8, fontSize: 20, paddingRight: 15 }}>
          Want to filter posts?
        </label>
        <input
          value={userIdInput}
          type="number"
          onChange={(e) => setUserIdInput(e.target.value)}
          placeholder="type a userId"
          style={{
            height: "40px",
            padding: 10,
            borderRadius: 10,
            border: "1px solid #e5e7eb",
            marginBottom: "8px"
          }}
        />
      </div>

      {data?.map((post) => (
        <div key={post.id} style={{
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 16,
          marginBottom: 12
        }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>
            <p>User #{post.userId} - Post #{post.id}</p>
          </div>
          <h3 style={{ margin: "8px 0" }}>{post.title}</h3>
          <p style={{ margin: 0 }}>{post.body}</p>
        </div>
      ))}
    </main>
  );
}