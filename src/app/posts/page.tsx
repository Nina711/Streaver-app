"use client";

import useSWR from "swr";
import { useState } from "react";
import { useDebounce } from "../../lib/useDebounce";
import type { Post } from "../../lib/types";
import { fetcher } from "../../lib/fetcher"

export default function PostsPage() {
  const [userIdInput, setUserIdInput] = useState("");
  const [isSlow, setIsSlow] = useState(false);
  const debouncedUserIdInput = useDebounce(userIdInput, 600);
  const userId = debouncedUserIdInput.trim();
  const url = userId ? `https://jsonplaceholder.typicode.com/posts?userId=${encodeURIComponent(userId)}` : "https://jsonplaceholder.typicode.com/posts";
  const { data, error, isLoading, isValidating } = useSWR<Post[]>(
    url,
    fetcher,
    {
      revalidateOnReconnect: true,
      shouldRetryOnError: true,
      loadingTimeout: 1500,
      onLoadingSlow: () => setIsSlow(true),
      onSuccess: () => setIsSlow(false),
      onError: () => setIsSlow(false)
    }
  );

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

      {isLoading && (
        <p style={{ marginBottom: 8 }}>Loading posts...</p>
      )}

      {isSlow && (
        <p style={{
          color: "#b45309",
          marginBottom: 12
        }}>
          This is taking longer than expected...
        </p>
      )}

      {error && (
        <p style={{
          color: "crimson"
        }}>Error: {String(error.message || error)}</p>
      )}

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