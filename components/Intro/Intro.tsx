"use client";

import { useEffect } from "react";
import "./Intro.css";

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
    <div className="intro">
      <div className="logo">CUSTODIO</div>
      <div className="flash" />
    </div>
  );
}