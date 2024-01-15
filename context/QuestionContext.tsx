"use client";

import Cookies from "js-cookie";

import { Question, Answer } from "@/types";
import { generateQuestion } from "../api/open-ai";
import { useState, useEffect, ReactNode, useContext, createContext } from "react";

const QUESTION_COUNT = parseInt(process.env["NEXT_PUBLIC_QUESTION_COUNT"]!);

interface QuestionContextType {
  target: number;
  answers: Answer[];
  questions: Question[];

  reset: () => void;
  generateQuestions: (increase: number) => void;

  setAnswers: (answers: Answer[]) => void;
}

const QuestionContext = createContext<QuestionContextType>({
  target: 0,
  answers: [],
  questions: [],

  reset: () => {},
  generateQuestions: () => {},

  setAnswers: (answers: Answer[]) => {},
});

export const useQuestion = () => {
  return useContext(QuestionContext);
};

type QuestionProviderProps = {
  children: ReactNode;

  initialTarget: number;
  initialAnswers: Answer[];
  initialQuestions: Question[];
};

export const QuestionProvider = ({
  children,

  initialTarget,
  initialAnswers,
  initialQuestions,
}: QuestionProviderProps) => {
  const [target, setTarget] = useState<number>(initialTarget);
  const [answers, setAnswers] = useState<Answer[]>(initialAnswers);
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);

  const generateQuestions = async (increase: number) => {
    console.log(`Requesting ${increase} questions from the context`);

    setTarget((target) => target + increase);
  };

  const reset = () => {
    Cookies.remove("target");
    Cookies.remove("company");
    Cookies.remove("answers");
    Cookies.remove("questions");

    setTarget(0);
    setAnswers([]);
    setQuestions([]);
  };

  useEffect(() => {
    if (questions.length >= target) {
      return;
    }

    const generate = async () => {
      // I'm assuming these answers are present since these are the first three questions
      const answerName = answers.find((answer) => answer.uuid === "4dfb8b90-a70e-47cc-a9f2-51608f86d04c")!;
      const answerMission = answers.find((answer) => answer.uuid === "76253f31-0daf-4fa5-908e-6538f7da5c16")!;
      const answerActivity = answers.find((answer) => answer.uuid === "0db64dd3-5440-49a4-9252-c0d8ba49fa62")!;

      const name = answerName ? answerName.value : "Nog niet beantwoord, maar vraag er niet naar";
      const mission = answerMission ? answerMission.value : "Nog niet beantwoord, maar vraag er niet naar";
      const activity = answerActivity ? answerActivity.value : "Nog niet beantwoord, maar vraag er niet naar";

      const company = { name, mission, activity };

      const questionSimplified = questions.map((question) => question.question);
      const questionResponse = await generateQuestion(company!, questions.length, QUESTION_COUNT, questionSimplified);
      const questionsParsed = JSON.stringify([...questions, questionResponse]);

      setQuestions([...questions, questionResponse]);

      Cookies.set("questions", questionsParsed);
    };

    generate();
  }, [target, questions.length]);

  useEffect(() => {
    const answersJson = JSON.stringify(answers);

    Cookies.set("answers", answersJson);
  }, [answers]);

  return (
    <QuestionContext.Provider
      value={{
        target,
        answers,
        questions,

        reset,
        generateQuestions,

        setAnswers,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionProvider;
