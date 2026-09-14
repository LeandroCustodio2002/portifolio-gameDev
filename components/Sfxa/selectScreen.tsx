"use client";

import { useEffect } from "react";

export default function SelectScreenSongPlayer() {
  useEffect(() => {
const audio = new Audio(
  "/music/selectScreen.mp3"
);

    audio.loop = true;
    audio.volume = 0.5;

    const startMusic = () => {
      audio.play();

      window.removeEventListener(
        "click",
        startMusic
      );
    };

    window.addEventListener(
      "click",
      startMusic
    );

    return () => {
      window.removeEventListener(
        "click",
        startMusic
      );

      audio.pause();
    };
  }, []);

  return null;
}