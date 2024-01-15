"use client";

import styles from "./Intro.module.scss";
import defaultQuestions from "../../questions.json";

import Input from "@/components/Input";
import Reset from "@/components/Reset";
import Cookies from "js-cookie";
import Results from "@/components/Results";
import Background from "@/components/Background";

import { useState } from "react";
import { useQuestion } from "@/context/QuestionContext";
import { Answer, Question } from "@/types";

const QUESTION_COUNT = parseInt(process.env["NEXT_PUBLIC_QUESTION_COUNT"]!);

type IntroProps = {
  initialAnswers: Answer[];
};

export default function Intro({ initialAnswers }: IntroProps) {
  const { questions, generateQuestions, resetQuestions } = useQuestion();

  const [index, setIndex] = useState(initialAnswers.length);
  const [answers, setAnswers] = useState(initialAnswers);

  const questionsCombined = [...defaultQuestions, ...questions] as Question[];
  const questionsAnswered = index - 3 >= QUESTION_COUNT;

  const questionCurrent = questionsCombined[index];
  const questionPrevious = questionsCombined[index - 1];

  const getCompany = (answers: Answer[]) => {
    if (answers.length < 2) {
      throw new Error("Not enough answers to generate company");
    }

    // I'm assuming these answers are present since these are the first three questions
    const answerName = answers.find((answer) => answer.uuid === "4dfb8b90-a70e-47cc-a9f2-51608f86d04c")!;
    const answerMission = answers.find((answer) => answer.uuid === "76253f31-0daf-4fa5-908e-6538f7da5c16")!;
    const answerActivity = answers.find((answer) => answer.uuid === "0db64dd3-5440-49a4-9252-c0d8ba49fa62")!;

    const name = answerName ? answerName.value : "Nog niet beantwoord, maar vraag er niet naar";
    const mission = answerMission ? answerMission.value : "Nog niet beantwoord, maar vraag er niet naar";
    const activity = answerActivity ? answerActivity.value : "Nog niet beantwoord, maar vraag er niet naar";

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
    if (answersUpdated.length === 2 || answersUpdated.length === 3) {
      const company = getCompany(answersUpdated);
      const count = answersUpdated.length === 2 ? 1 : 5;

      generateQuestions(company, count);
    }
  };

  return (
    <main className={styles.main}>
      <Background color={questionCurrent ? questionCurrent.color : questionPrevious?.color} />

      <div className={styles.main__content}>
        {questionCurrent && (
          <Input question={questionCurrent} onAnswer={(answer) => handleAnswer(answer, questionCurrent)} />
        )}

        {!questionCurrent && !questionsAnswered && <Input loading={true} question={questionPrevious} />}

        {questionsAnswered && <Results questions={questions} answers={answers} />}
      </div>

      <Reset
        onReset={() => {
          Cookies.remove("answers");

          setIndex(0);
          setAnswers([]);
          resetQuestions();

          window.location.reload();
        }}
      />
    </main>
  );
}

// https://alvarotrigo.com/blog/animated-backgrounds-css/
// https://cssloaders.github.io/
