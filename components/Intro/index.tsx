"use client";

import styles from "./Intro.module.scss";
import defaultQuestions from "../../questions.json";

import Input from "@/components/Input";
import Reset from "@/components/Reset";
import Results from "@/components/Results";
import Background from "@/components/Background";

import { useState } from "react";
import { Question } from "@/types";
import { useQuestion } from "@/context/QuestionContext";

const QUESTION_COUNT = parseInt(process.env["NEXT_PUBLIC_QUESTION_COUNT"]!);

export default function Intro() {
  const { answers, questions, resetEverything, setAnswers, setTarget } = useQuestion();

  const [index, setIndex] = useState(answers.length);

  const questionsCombined = [...defaultQuestions, ...questions] as Question[];
  const questionsAnswered = index - 3 >= QUESTION_COUNT;

  const questionCurrent = questionsCombined[index];
  const questionPrevious = questionsCombined[index - 1];

  const handleAnswer = async (answer: string, question: Question) => {
    const { uuid } = question;

    const answersUpdated = [...answers, { uuid, value: answer }];

    setIndex(index + 1);
    setAnswers(answersUpdated);

    // If the user has answered the first three questions we can generate more questions
    if (answersUpdated.length === 2 || answersUpdated.length === 3) {
      setTarget(answersUpdated.length === 2 ? 1 : 6);
    }
  };

  const handleReset = () => {
    setIndex(0);

    resetEverything();
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

      <Reset onReset={handleReset} />
    </main>
  );
}

// https://alvarotrigo.com/blog/animated-backgrounds-css/
// https://cssloaders.github.io/
