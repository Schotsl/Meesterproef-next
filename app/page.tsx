"use client";

import styles from "./page.module.scss";
import choices from "@/choices.json";

import Results from "@/components/Results";

import Input from "@/components/Input";

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
      <h1 className={styles.main__title}>Guide your own company!</h1>

      {choice ? <Input choice={choice} onAnswer={handleAnswer} /> : <Results />}
    </main>
  );
}
