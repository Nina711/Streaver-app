import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Streaver challenge app</h1>
      <p>Here's what you can do with this app (click on either one to test):</p>
      <ul>
        <li><Link href="/posts">List posts</Link></li>
        <li>Search posts by id</li>
      </ul>
    </main>
  );
}
