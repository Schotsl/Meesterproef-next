"use client";

import styles from "./Intro.module.scss";

import defaultQuestions from "../../questions.json";

import Cookies from "js-cookie";
import Input from "@/components/Input";
import Reset from "@/components/Reset";
import Results from "@/components/Results";
import Background from "@/components/Background";

import { Answer, Company, Question } from "@/types";
import { useState } from "react";
import { generateQuestion } from "../../api/open-ai";

type IntroProps = {
  initialAnswers: Answer[];
  initialQuestions: Question[];
};

export default function Intro({
  initialAnswers,
  initialQuestions,
}: IntroProps) {
  const [index, setIndex] = useState(initialAnswers.length);
  const [answers, setAnswers] = useState(initialAnswers);
  const [questions, setQuestions] = useState(initialQuestions);

  const questionsCombined = [...defaultQuestions, ...questions] as Question[];
  const questionCurrent = questionsCombined[index];

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

  const handleCompletion = async (
    company: Company,
    index: number,
    asked: string[] = []
  ) => {
    if (index >= 6) {
      return;
    }

    const question = await generateQuestion(company, index, 6, asked);
    const questionValue = question.question;

    setQuestions((questions) => {
      const questionsUpdated = [...questions, question];
      const questionsParsed = JSON.stringify(questionsUpdated);

      Cookies.set("questions", questionsParsed);

      return questionsUpdated;
    });

    index += 1;
    asked = [...asked, questionValue];

    handleCompletion(company, index, asked);
  };

  return (
    <main className={styles.main}>
      <Background color={questionCurrent?.color} />

      <div className={styles.main__content}>
        {questionCurrent ? (
          <Input
            question={questionCurrent}
            onAnswer={(answer) => handleAnswer(answer, questionCurrent)}
          />
        ) : (
          <Results />
        )}
      </div>

      <Reset
        onReset={() => {
          Cookies.remove("answers");
          Cookies.remove("questions");

          setIndex(0);
          setAnswers([]);
          setQuestions([]);
        }}
      />
    </main>
  );
}

// https://alvarotrigo.com/blog/animated-backgrounds-css/
