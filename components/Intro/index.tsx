"use client";

import styles from "./Intro.module.scss";
import choices from "@/choices.json";

import Cookies from "js-cookie";
import Input from "@/components/Input";
import Results from "@/components/Results";
import Background from "@/components/Background";

import { Answer, Choice } from "@/types";
import { useState } from "react";

type IntroProps = {
  initial: Answer[];
};

export default function Intro({ initial }: IntroProps) {
  const [index, setIndex] = useState(initial.length);
  const [answers, setAnswers] = useState(initial);

  const handleAnswer = (answer: string, choice: Choice) => {
    const { uuid } = choice;

    const answersUpdated = [...answers, { uuid, value: answer }];
    const answersParsed = JSON.stringify(answersUpdated);

    setIndex(index + 1);
    setAnswers([...answers, { uuid, value: answer }]);

    Cookies.set("answers", answersParsed);
  };

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
