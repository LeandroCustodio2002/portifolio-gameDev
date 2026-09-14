import GlobeCanvas from "@/components/Globe/GlobeCanvas";
import SelectScreenSongPlayer  from "@/components/Sfx/selectScreen";
import Background from "@/components/Background/Background";
import ProjectBanner from "@/components/ProjectBanner/ProjectBanner";
import ProjectPortrait from "@/components/ProjectPortrait/ProjectPortrait"; 

export default function Home() {
  return (
    <>
      <Background />
      <main
        style={{
          width: "100vw",
          height: "100vh",
          background: "#000814",
          overflow: "hidden",
        }}
      >
        <SelectScreenSongPlayer />
        <ProjectPortrait
  image="/projects/trail-to-elenki.png" />
        <GlobeCanvas />
        <ProjectBanner title="Trail To Elenki" />
      </main>
    </>
  );
}