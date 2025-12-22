import Link from "next/link";

export default function TownPage() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Town</h1>
      <p>If you can see this, the /town route works ✅</p>
      <Link href="/">Back home</Link>
    </main>
  );
}
