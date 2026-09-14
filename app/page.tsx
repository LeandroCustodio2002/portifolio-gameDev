"use client";

import { useRef, useState } from "react";
import GlobeCanvas from "@/components/Globe/GlobeCanvas";
import SelectScreenSongPlayer from "@/components/Sfx/selectScreen";
import Background from "@/components/Background/Background";
import ProjectBanner from "@/components/ProjectBanner/ProjectBanner";
import ProjectPortrait from "@/components/ProjectPortrait/ProjectPortrait";
import projectsData from "@/public/data/projects.json";
import type { Project } from "@/lib/projects";

const projects = projectsData as Project[];
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Home() {
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleHover = (project: Project) => {
    clearTimeout(leaveTimer.current);
    setActiveProject(project);
  };

  const handleLeave = () => {
    leaveTimer.current = setTimeout(() => {
      setActiveProject(projects[0]);
    }, 80);
  };

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
        <ProjectPortrait image={BASE_PATH + activeProject.portrait} />
        <GlobeCanvas
          projects={projects}
          onHover={handleHover}
          onLeave={handleLeave}
        />
        <ProjectBanner title={activeProject.name} />
      </main>
    </>
  );
}
