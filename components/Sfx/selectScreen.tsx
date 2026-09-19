"use client";

import { useEffect } from "react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function SelectScreenSongPlayer({ autoPlay = false }: { autoPlay?: boolean }) {
  useEffect(() => {
    const audio = new Audio(`${BASE_PATH}/music/selectScreen.mp3`);
    audio.loop = true;
    audio.volume = 0.5;

    if (autoPlay) {
      audio.play().catch(() => {});
    } else {
      const startMusic = () => {
        audio.play();
        window.removeEventListener("click", startMusic);
      };
      window.addEventListener("click", startMusic);
      return () => {
        window.removeEventListener("click", startMusic);
        audio.pause();
      };
    }

    return () => {
      audio.pause();
    };
  }, [autoPlay]);

  return null;
}
