"use client";

import styles from "./page.module.scss";
import choices from "@/choices.json";
import Choice from "@/components/Choice";

import { Option } from "@/types";
import { useState } from "react";

export default function Home() {
  const [index, setIndex] = useState(0);

  const handleAnswer = (option: Option) => {
    console.log(option);

    setIndex(index + 1);
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.main__title}>Meesterproef</h1>

      <Choice choice={choices[index]} onAnswer={handleAnswer} />
    </main>
  );
}
