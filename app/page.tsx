"use client";

import styles from "./page.module.scss";
import choices from "@/choices.json";

import Input from "@/components/Input";
import Results from "@/components/Results";
import Background from "@/components/Background";

import { Choice } from "@/types";
import { useState } from "react";

export default function Home() {
  const [index, setIndex] = useState(0);

  const handleAnswer = () => {
    setIndex(index + 1);
  };

  const choice = choices[index] as Choice;

  return (
    <main className={styles.main}>
      <Background color={choice?.color} />

      <div className={styles.main__content}>
        {choice ? (
          <Input choice={choice} onAnswer={handleAnswer} />
        ) : (
          <Results />
        )}
      </div>
    </main>
  );
}

// https://alvarotrigo.com/blog/animated-backgrounds-css/
