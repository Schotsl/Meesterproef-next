"use client";

import styles from "./Intro.module.scss";
import defaultQuestions from "../../questions.json";

import Input from "@/components/Input";
import Results from "@/components/Results";
import Background from "@/components/Background";

import { useEffect, useState } from "react";
import { Question } from "@/types";
import { useQuestion } from "@/context/QuestionContext";

const QUESTION_COUNT = parseInt(process.env["NEXT_PUBLIC_QUESTION_COUNT"]!);

const profitColors = ["#003366", "#0055B8", "#007BFF", "#6D9BC3"];
const workersColors = ["#673AB7", "#9575CD", "#B39DDB", "#D1C4E9"];
const societyColors = ["#4CAF50", "#80C783", "#8C977D", "#3CB371"];

export default function Intro() {
  const { answers, questions, setAnswers, setTarget, answersTransformed, answersImpact } = useQuestion();

  const [money, setMoney] = useState<number>(0);
  const [society, setSociety] = useState<number>(0);
  const [workers, setWorkers] = useState<number>(0);

  const [color, setColor] = useState("#3586ff");
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

  useEffect(() => {
    const answersIndex = answersTransformed.length - 1;
    const answersObject = answersTransformed[answersIndex];

    if (!answersObject) return;

    const answersCompleted = answersTransformed.length === QUESTION_COUNT;

    const { employeeWellbeing, financialPresentation, societalImpact } = answersCompleted
      ? answersImpact
      : answersObject.choice.impact;

    const largest = Math.max(employeeWellbeing, financialPresentation, societalImpact);
    const index = Math.floor(Math.random() * 4);

    if (largest === societalImpact) {
      setSociety((prev) => prev + 10);
      setColor(societyColors[index]);
    }

    if (largest === employeeWellbeing) {
      setWorkers((prev) => prev + 10);
      setColor(workersColors[index]);
    }

    if (largest === financialPresentation) {
      setMoney((prev) => prev + 10);
      setColor(profitColors[index]);
    }
  }, [answersTransformed]);

  return (
    <main className={styles.main}>
      <Background color={color} money={money} society={society} workers={workers} completed={questionsAnswered} />

      <div className={styles.main__content}>
        {questionCurrent && (
          <Input
            color={color}
            question={questionCurrent}
            onAnswer={(answer) => handleAnswer(answer, questionCurrent)}
          />
        )}

        {!questionCurrent && !questionsAnswered && <Input color={color} loading={true} question={questionPrevious} />}

        {questionsAnswered && <Results questions={questions} answers={answers} />}
      </div>
    </main>
  );
}

// https://alvarotrigo.com/blog/animated-backgrounds-css/
// https://cssloaders.github.io/
