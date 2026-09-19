"use client";

import { useRef, useState } from "react";
import GlobeCanvas from "@/components/Globe/GlobeCanvas";
import SelectScreenSongPlayer from "@/components/Sfx/selectScreen";
import Background from "@/components/Background/Background";
import ProjectBanner from "@/components/ProjectBanner/ProjectBanner";
import ProjectPortrait from "@/components/ProjectPortrait/ProjectPortrait";
import InsertCoin from "@/components/InsertCoin/InsertCoin";
import projectsData from "@/public/data/projects.json";
import type { Project } from "@/lib/projects";

const projects = projectsData as Project[];
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Home() {
  const [inserted, setInserted] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleHover = (project: Project) => {
    clearTimeout(leaveTimer.current);
    setActiveProject(project);
  };

  const handleLeave = () => {
    leaveTimer.current = setTimeout(() => {
      setActiveProject(null);
    }, 80);
  };

  if (!inserted) {
    return <InsertCoin onStart={() => setInserted(true)} />;
  }

  return (
    <>
      <SelectScreenSongPlayer autoPlay />
      <Background />
      <main
        style={{
          width: "100vw",
          height: "100vh",
          background: "#000814",
          overflow: "hidden",
        }}
      >
        <ProjectPortrait image={activeProject ? BASE_PATH + activeProject.portrait : undefined} />
        <GlobeCanvas
          projects={projects}
          onHover={handleHover}
          onLeave={handleLeave}
        />
        {activeProject && <ProjectBanner title={activeProject.name} />}
      </main>
    </>
  );
}
