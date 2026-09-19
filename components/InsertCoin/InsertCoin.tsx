"use client";

export default function InsertCoin({ onStart }: { onStart: () => void }) {
  return (
    <div
      onClick={onStart}
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 9999,
        gap: "2rem",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-press-start-2p)",
          color: "#fff",
          fontSize: "clamp(14px, 2.5vw, 32px)",
          letterSpacing: "0.08em",
          animation: "blink 1s step-start infinite",
          userSelect: "none",
        }}
      >
        INSERT COIN
      </span>
    </div>
  );
}
