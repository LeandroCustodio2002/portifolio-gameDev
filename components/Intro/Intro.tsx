"use client";

import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";

import "./Intro.css";
import CloudSphere from "./CloudSphere";

interface Props {
  onFinish: () => void;
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function CustodioIntro({ onFinish }: Props) {
  useEffect(() => {
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
  }, [onFinish]);

  return (
    <>
      <Canvas
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
        }}
        camera={{ position: [0, 0, 0.1] }}
      >
        <color attach="background" args={["#6cb8ff"]} />
        <CloudSphere />
      </Canvas>

      <div className="intro">
        <div className="logo">CUSTODIO</div>
        <div className="flash" />
      </div>
    </>
  );
}