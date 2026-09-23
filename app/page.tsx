"use client";

import { useRef, useState } from "react";
import GlobeCanvas from "@/components/Globe/GlobeCanvas";
import SelectScreenSongPlayer from "@/components/Sfx/selectScreen";
import Background from "@/components/Background/Background";
import ProjectBanner from "@/components/ProjectBanner/ProjectBanner";
import ProjectPortrait from "@/components/ProjectPortrait/ProjectPortrait";
import InsertCoin from "@/components/InsertCoin/InsertCoin";
import Intro from "@/components/Intro/Intro";

import projectsData from "@/public/data/projects.json";
import type { Project } from "@/lib/projects";

const projects = projectsData as Project[];
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Home() {
  const [screen, setScreen] = useState<"insert" | "intro" | "home">("insert");

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeSlotPos, setActiveSlotPos] = useState<[number, number, number] | null>(null);

  const leaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleHover = (
    project: Project,
    localPos: [number, number, number]
  ) => {
    clearTimeout(leaveTimer.current);

    setActiveProject(project);
    setActiveSlotPos(localPos);
  };

  const handleLeave = () => {
    leaveTimer.current = setTimeout(() => {
      setActiveProject(null);
      setActiveSlotPos(null);
    }, 80);
  };

  // INSERT COIN
  if (screen === "insert") {
    return (
      <InsertCoin
        onStart={() => setScreen("intro")}
      />
    );
  }

  // INTRO
  if (screen === "intro") {
    return (
      <Intro
        onFinish={() => setScreen("home")}
      />
    );
  }

  // HOME
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
        <ProjectPortrait
          image={
            activeProject
              ? BASE_PATH + activeProject.portrait
              : undefined
          }
        />

        <GlobeCanvas
          projects={projects}
          onHover={handleHover}
          onLeave={handleLeave}
          activeSlotPos={activeSlotPos}
        />

        {activeProject && (
          <ProjectBanner title={activeProject.name} />
        )}
      </main>
    </>
  );
}