"use client";

import styles from "./Intro.module.scss";

import defaultQuestions from "../../questions.json";

import Cookies from "js-cookie";
import Input from "@/components/Input";
import Reset from "@/components/Reset";
import Results from "@/components/Results";
import Background from "@/components/Background";

import { Answer, Company, Question } from "@/types";
import { useEffect, useState } from "react";
import { generateQuestion } from "../../api/open-ai";

const QUESTION_LIMIT = 6;

type IntroProps = {
  initialAnswers: Answer[];
  initialQuestions: Question[];
};

export default function Intro({ initialAnswers, initialQuestions }: IntroProps) {
  const [index, setIndex] = useState(initialAnswers.length);
  const [answers, setAnswers] = useState(initialAnswers);
  const [questions, setQuestions] = useState(initialQuestions);

  const questionsCombined = [...defaultQuestions, ...questions] as Question[];
  const questionCurrent = questionsCombined[index];

  const getCompany = (answers: Answer[]) => {
    if (answers.length < 3) {
      throw new Error("Not enough answers to generate company");
    }

    // I'm assuming these answers are present since these are the first three questions
    const name = answers.find((answer) => answer.uuid === "4dfb8b90-a70e-47cc-a9f2-51608f86d04c")!.value;
    const activity = answers.find((answer) => answer.uuid === "0db64dd3-5440-49a4-9252-c0d8ba49fa62")!.value;
    const mission = answers.find((answer) => answer.uuid === "76253f31-0daf-4fa5-908e-6538f7da5c16")!.value;

    return { name, activity, mission };
  };

  const handleAnswer = async (answer: string, question: Question) => {
    const { uuid } = question;

    const answersUpdated = [...answers, { uuid, value: answer }];
    const answersParsed = JSON.stringify(answersUpdated);

    setIndex(index + 1);
    setAnswers([...answers, { uuid, value: answer }]);

    Cookies.set("answers", answersParsed);

    // If the user has answered the first three questions we can generate more questions
    if (answersUpdated.length === 3) {
      const company = getCompany(answersUpdated);
      const index = 0;

      handleCompletion(company, index);
    }
  };

  // This recursive function will generate questions until the limit is reached
  const handleCompletion = async (company: Company, index: number, asked: string[] = []) => {
    if (index >= QUESTION_LIMIT) {
      return;
    }

    const question = await generateQuestion(company, index, QUESTION_LIMIT, asked);
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

  // In case the user closed the tab mid-way through the question generation process we'll resume it
  useEffect(() => {
    if (questions.length < QUESTION_LIMIT && answers.length >= 3) {
      const index = questions.length;
      const company = getCompany(answers);
      const asked = questions.map((question) => question.question);

      handleCompletion(company, index, asked);
    }
  }, []);

  return (
    <main className={styles.main}>
      <Background color={questionCurrent?.color} />

      <div className={styles.main__content}>
        {questionCurrent ? (
          <Input question={questionCurrent} onAnswer={(answer) => handleAnswer(answer, questionCurrent)} />
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
