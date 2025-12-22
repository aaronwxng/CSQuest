import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function QuestPage({ params }: Props) {
  const { id } = await params;

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Quest: {id}</h1>
      <p>This is where the question engine will go.</p>

      <p>
        <Link href="/town">Back to town</Link>
      </p>
    </main>
  );
}
