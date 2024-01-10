"use client";

import styles from "./page.module.scss";
import choices from "@/choices.json";

import Input from "@/components/Input";
import Results from "@/components/Results";
import Background from "@/components/Background";

import { Choice } from "@/types";
import { useEffect, useState } from "react";

type Answer = {
  uuid: string;
  value: string;
};

export default function Home() {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleAnswer = (answer: string, choice: Choice) => {
    const { uuid } = choice;

    setAnswers([...answers, { uuid, value: answer }]);
    setIndex(index + 1);
  };

  useEffect(() => {
    const answers = localStorage.getItem("answers");

    if (!answers) {
      return;
    }

    // Calculate index based on furthest question that is alreadyd answered
    const index = JSON.parse(answers).length;

    setIndex(index);
    setLoaded(true);
    setAnswers(JSON.parse(answers));
  }, []);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers, loaded]);

  const choice = choices[index] as Choice;

  return (
    <main className={styles.main}>
      <Background color={choice?.color} />

      <div className={styles.main__content}>
        {choice ? (
          <Input
            choice={choice}
            onAnswer={(answer) => handleAnswer(answer, choice)}
          />
        ) : (
          <Results />
        )}
      </div>
    </main>
  );
}

// https://alvarotrigo.com/blog/animated-backgrounds-css/
