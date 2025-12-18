"use client";

import useSWR from "swr";
import { useState } from "react";
import { useDebounce } from "../../lib/useDebounce";
import type { Post } from "../../lib/types";
import { fetcher } from "../../lib/fetcher"
import styles from "./posts.module.css"

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
    <main className={styles.container}>

      <h1 className={styles.title}>Posts</h1>

      <p className={styles.status}>
        {isValidating ? "Updating..." : "Done"}
      </p>

      <div className={styles.fiterContainer}>
        <label className={styles.label}>
          Want to filter posts?
        </label>
        <input
          value={userIdInput}
          type="number"
          onChange={(e) => setUserIdInput(e.target.value)}
          placeholder="type a userId"
          className={styles.input}
        />
      </div>

      {isLoading && (
        <p className={styles.loading}>Loading posts...</p>
      )}

      {isSlow && (
        <p className={styles.slow}>
          This is taking longer than expected...
        </p>
      )}

      {error && (
        <p className={styles.error}>Error: {String(error.message || error)}</p>
      )}

      {data?.map((post) => (
        <div key={post.id} className={styles.card}>
          <div className={styles.cardInfo}>
            <p>User #{post.userId} - Post #{post.id}</p>
          </div>
          <h3 className={styles.cardTitle}>{post.title}</h3>
          <p className={styles.cardBody}>{post.body}</p>
        </div>
      ))}
    </main>
  );
}