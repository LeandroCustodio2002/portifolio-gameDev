"use client";

import styles from "./ProjectBanner.module.css";

type Props = {
  title: string;
};

export default function ProjectBanner({
  title,
}: Props) {
  return (
    <div className={styles.banner}>
      <span>{title}</span>
    </div>
  );
}