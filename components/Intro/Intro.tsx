"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";

import "./Intro.css";
import IntroScene from "./IntroScene";

interface Props {
  onFinish: () => void;
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function CustodioIntro({ onFinish }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready) return;

    const audio = new Audio(
      `${BASE_PATH}/music/capLogo.mp3`
    );

    audio.volume = 0.8;

    audio.play().catch((err) => {
      console.error("Erro ao tocar música:", err);
    });

    const timer = setTimeout(() => {
      onFinish();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [ready, onFinish]);

  return (
    <div className={ready ? "intro-root playing" : "intro-root"}>
      <Canvas
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
        }}
        camera={{ position: [0, 0, 0.1] }}
      >
        <color attach="background" args={["#6cb8ff"]} />
        <Suspense fallback={null}>
          <IntroScene onReady={() => setReady(true)} />
        </Suspense>
      </Canvas>

      <div className="intro-whiteout" />

      <div className="intro">
        <div className="flash" />
      </div>

      <div className="intro-iris" />
    </div>
  );
}