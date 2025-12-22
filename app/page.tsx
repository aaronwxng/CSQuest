import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>CSQuest</h1>
      <p>Educational Coding RPG Game</p>

      <div style={{ display: "flex", gap: 12, marginTop: 12, flexDirection: "column" }}>
        <Link 
          href="/game" 
          style={{ 
            padding: "12px 24px", 
            background: "#3498db", 
            color: "white", 
            textDecoration: "none", 
            borderRadius: "8px",
            display: "inline-block",
            width: "fit-content"
          }}
        >
          🎮 Play Game
        </Link>
        <Link 
          href="/town" 
          style={{ 
            padding: "12px 24px", 
            background: "#27ae60", 
            color: "white", 
            textDecoration: "none", 
            borderRadius: "8px",
            display: "inline-block",
            width: "fit-content"
          }}
        >
          🏘️ Go to Town
        </Link>
        <Link 
          href="/quest/demo" 
          style={{ 
            padding: "12px 24px", 
            background: "#e74c3c", 
            color: "white", 
            textDecoration: "none", 
            borderRadius: "8px",
            display: "inline-block",
            width: "fit-content"
          }}
        >
          ⚔️ Start Demo Quest
        </Link>
      </div>
    </main>
  );
}