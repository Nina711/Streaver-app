import Link from "next/link";
import styles from "./home.module.css";

export default function Home() {
  return (
    <main
      className={styles.container}
    >
      <div className={styles.content}>
        <h1 className={styles.title}>
          Streaver challenge app
        </h1>

        <p className={styles.text}>
          This app allows users to list posts from an API and filter them by userId.
        </p>

        <Link
          href="/posts"
          className={styles.button}>
          Go to the posts
        </Link>
      </div>
    </main>
  );
} 
