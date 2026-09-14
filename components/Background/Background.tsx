"use client";

import { useState, useEffect } from "react";
import styles from "./Background.module.css";

const words = [
  "TRAIL TO ELENKI",
  "EU PRESIDENTE",
  "DROWNED SOUL",
  "ZER0 MANA",
  "UNTIL IT BLOOMS",
  "Godot",
  "Unity",
  "Unreal",
  "Maya"
];

const quotes = [
  "Despite everything, it's still you.",
  "Stay determined.",
  "The cake is a lie.",
  "This was a triumph.",
  "Why did I move here? I guess it was the weather.",
  "Surviving is winning, Franklin.",
  "Power comes in response to a need.",
  "I am the hope of the universe.",
  "I mustn't run away.",
  "Anywhere can be paradise.",
  "Throughout heaven and earth, I alone am the honored one.",
  "You lost because you didn't understand me.",
  "I'm not gonna run away.",
  "Believe it.",
  "Those who break the rules are scum...",
  "Jackpot!",
  "Now I'm motivated.",
  "Let's rock.",
  "I used to be an adventurer like you...",
  "...then I took an arrow in the knee.",
];

function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export default function Background() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className={styles.background} />;

  return (
    <div className={styles.background}>
      {/* Blobs */}
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={`blob-${i}`}
          className={styles.blob}
          style={{
            left: `${sr(i * 7) * 100}%`,
            width: `${100 + sr(i * 7 + 1) * 250}px`,
            height: `${60 + sr(i * 7 + 2) * 140}px`,
            animationDuration: `${30 + sr(i * 7 + 3) * 40}s`,
            animationDelay: `-${sr(i * 7 + 4) * 40}s`,
          }}
        />
      ))}

      {/* Palavras */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`word-${i}`}
          className={styles.word}
          style={{
            left: `${sr(i * 5 + 1000) * 100}%`,
            fontSize: `${18 + sr(i * 5 + 1001) * 50}px`,
            animationDuration: `${20 + sr(i * 5 + 1002) * 30}s`,
            animationDelay: `-${sr(i * 5 + 1003) * 30}s`,
          }}
        >
          {words[i % words.length]}
        </div>
      ))}

      {/* Frases */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={`quote-${i}`}
          className={styles.word}
          style={{
            left: `${sr(i * 5 + 2000) * 100}%`,
            fontSize: `${8 + sr(i * 5 + 2001) * 6}px`,
            fontWeight: 400,
            opacity: 0.08,
            animationDuration: `${35 + sr(i * 5 + 2002) * 40}s`,
            animationDelay: `-${sr(i * 5 + 2003) * 40}s`,
          }}
        >
          {quotes[i % quotes.length]}
        </div>
      ))}
    </div>
  );
}
