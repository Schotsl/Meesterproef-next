"use client";

import styles from "./page.module.scss";
import choices from "@/choices.json";

import Results from "@/components/Results";

import InputText from "@/components/Input/Text";
import InputChoice from "@/components/Input/Choice";

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

      {choice ? (
        <>
          {choice.type === "input" && (
            <InputText question={choice.question} onAnswer={handleAnswer} />
          )}

          {choice.type === "choice" && (
            <InputChoice choice={choice} onAnswer={handleAnswer} />
          )}
        </>
      ) : (
        <Results />
      )}
    </main>
  );
}
