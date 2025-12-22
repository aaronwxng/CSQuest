import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>CSQuest</h1>
      <p>Day 1 setup complete ✅</p>

      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <Link href="/town">Go to Town</Link>
        <Link href="/quest/demo">Start Demo Quest</Link>
      </div>
    </main>
  );
}