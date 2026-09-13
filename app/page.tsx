import GlobeCanvas from "@/components/Globe/GlobeCanvas";

export default function Home() {
  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        background: "#000814",
        overflow: "hidden",
      }}
    >

      <GlobeCanvas />
    </main>
  );
}