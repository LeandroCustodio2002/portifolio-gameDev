import GlobeCanvas from "@/components/Globe/GlobeCanvas";
import SelectScreenSongPlayer  from "@/components/sfx/selectScreen";

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
      <SelectScreenSongPlayer />
      <GlobeCanvas />
    </main>
  );
}