"use client";

import Cookies from "js-cookie";

import { Company, Question } from "@/types";
import { generateQuestion } from "../api/open-ai";
import { useState, useEffect, ReactNode, useContext, createContext } from "react";
import { set } from "react-hook-form";

const QUESTION_COUNT = parseInt(process.env["NEXT_PUBLIC_QUESTION_COUNT"]!);

interface QuestionContextType {
  target: number;
  company?: Company;
  questions: Question[];

  resetQuestions: () => void;
  generateQuestions: (company: Company, increase: number) => void;

  setCompany: (company: Company) => void;
}

const QuestionContext = createContext<QuestionContextType>({
  target: 0,
  company: undefined,
  questions: [],

  resetQuestions: () => {},
  generateQuestions: () => {},

  setCompany: () => {},
});

export const useQuestion = () => {
  return useContext(QuestionContext);
};

type QuestionProviderProps = {
  children: ReactNode;

  initialTarget: number;
  initialCompany: Company;
  initialQuestions: Question[];
};

export const QuestionProvider = ({
  children,

  initialTarget,
  initialCompany,
  initialQuestions,
}: QuestionProviderProps) => {
  const [target, setTarget] = useState<number>(initialTarget);
  const [company, setCompany] = useState<Company | undefined>(initialCompany);
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);

  const generateQuestions = async (company: Company, increase: number) => {
    console.log(`Requesting ${increase} questions from the context`);

    setCompany(company);
    setTarget((target) => target + increase);
  };

  const resetQuestions = () => {
    Cookies.remove("questions");
    Cookies.remove("target");
    Cookies.remove("company");

    setTarget(0);
    setCompany(undefined);
    setQuestions([]);
  };

  useEffect(() => {
    console.log(questions.length);
    console.log(target);
    if (questions.length >= target) {
      return;
    }

    const generate = async () => {
      const questionSimplified = questions.map((question) => question.question);
      const questionResponse = await generateQuestion(company!, questions.length, QUESTION_COUNT, questionSimplified);
      const questionsParsed = JSON.stringify([...questions, questionResponse]);

      setQuestions([...questions, questionResponse]);

      Cookies.set("questions", questionsParsed);
    };

    generate();
  }, [target, questions.length]);

  return (
    <QuestionContext.Provider
      value={{
        target,
        company,
        questions,

        resetQuestions,
        generateQuestions,

        setCompany,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionProvider;
