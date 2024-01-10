"use client";

import styles from "./Intro.module.scss";
import questions from "@/questions.json";

import Cookies from "js-cookie";
import Input from "@/components/Input";
import Results from "@/components/Results";
import Background from "@/components/Background";

import { Answer, Question } from "@/types";
import { useState } from "react";

type IntroProps = {
  initial: Answer[];
};

export default function Intro({ initial }: IntroProps) {
  const [index, setIndex] = useState(initial.length);
  const [answers, setAnswers] = useState(initial);

  const handleAnswer = (answer: string, question: Question) => {
    const { uuid } = question;

    const answersUpdated = [...answers, { uuid, value: answer }];
    const answersParsed = JSON.stringify(answersUpdated);

    setIndex(index + 1);
    setAnswers([...answers, { uuid, value: answer }]);

    Cookies.set("answers", answersParsed);
  };

  const question = questions[index] as Question;

  return (
    <main className={styles.main}>
      <Background color={question?.color} />

      <div className={styles.main__content}>
        {question ? (
          <Input
            question={question}
            onAnswer={(answer) => handleAnswer(answer, question)}
          />
        ) : (
          <Results />
        )}
      </div>
    </main>
  );
}

// https://alvarotrigo.com/blog/animated-backgrounds-css/
