"use client";

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



export default function Background() {
  return (
    <div className={styles.background}>
      {/* Pedras */}
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={`blob-${i}`}
          className={styles.blob}
          style={{
            left: `${Math.random() * 100}%`,
            width: `${100 + Math.random() * 250}px`,
            height: `${60 + Math.random() * 140}px`,
            animationDuration: `${
              30 + Math.random() * 40
            }s`,
            animationDelay: `-${
              Math.random() * 40
            }s`,
          }}
        />
      ))}

      {/* Palavras */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`word-${i}`}
          className={styles.word}
          style={{
            left: `${Math.random() * 100}%`,
            fontSize: `${
              18 + Math.random() * 50
            }px`,
            animationDuration: `${
              20 + Math.random() * 30
            }s`,
            animationDelay: `-${
              Math.random() * 30
            }s`,
          }}
        >
          {words[i % words.length]}
        </div>
      ))}

      {/* Frases famosas */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={`quote-${i}`}
          className={styles.word}
          style={{
            left: `${Math.random() * 100}%`,
            fontSize: `${
              8 + Math.random() * 6
            }px`,
            fontWeight: 400,
            opacity: 0.08,
            animationDuration: `${
              35 + Math.random() * 40
            }s`,
            animationDelay: `-${
              Math.random() * 40
            }s`,
          }}
        >
          {quotes[i % quotes.length]}
        </div>
      ))}
    </div>
  );
}