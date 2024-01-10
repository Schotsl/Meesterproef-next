"use client";

import styles from "./Intro.module.scss";
import intialQuestions from "@/questions.json";

import Cookies from "js-cookie";
import Input from "@/components/Input";
import Reset from "@/components/Reset";
import Results from "@/components/Results";
import Background from "@/components/Background";

import { Answer, Company, Question } from "@/types";
import { useState } from "react";
import { generateQuestion } from "../../api/open-ai";

type IntroProps = {
  initial: Answer[];
};

export default function Intro({ initial }: IntroProps) {
  const [index, setIndex] = useState(initial.length);
  const [answers, setAnswers] = useState(initial);
  const [questions, setQuestions] = useState(intialQuestions);

  const handleAnswer = async (answer: string, question: Question) => {
    const { uuid } = question;

    const answersUpdated = [...answers, { uuid, value: answer }];
    const answersParsed = JSON.stringify(answersUpdated);

    setIndex(index + 1);
    setAnswers([...answers, { uuid, value: answer }]);

    Cookies.set("answers", answersParsed);

    if (answersUpdated.length === 3) {
      const name = answersUpdated.find(
        (answer) => answer.uuid === "4dfb8b90-a70e-47cc-a9f2-51608f86d04c"
      )!.value;

      const activity = answersUpdated.find(
        (answer) => answer.uuid === "0db64dd3-5440-49a4-9252-c0d8ba49fa62"
      )!.value;

      const mission = answersUpdated.find(
        (answer) => answer.uuid === "76253f31-0daf-4fa5-908e-6538f7da5c16"
      )!.value;

      handleCompletion({ name, activity, mission }, 0);
    }
  };

  const handleCompletion = async (company: Company, index: number) => {
    if (index >= 4) {
      return;
    }

    const question = await generateQuestion(company, index);

    setQuestions((questions) => [...questions, question]);

    handleCompletion(company, index + 1);
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

      <Reset
        onReset={() => {
          Cookies.remove("answers");

          setIndex(0);
          setAnswers([]);
          setQuestions(intialQuestions);
        }}
      />
    </main>
  );
}

// https://alvarotrigo.com/blog/animated-backgrounds-css/
