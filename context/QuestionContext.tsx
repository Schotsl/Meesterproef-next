"use client";

import Cookies from "js-cookie";

import { fetchQuestion } from "../api/open-ai";
import { Question, Answer, Impact, AnswerTransformed } from "@/types";
import { useState, useEffect, ReactNode, useContext, createContext, useMemo } from "react";

const QUESTION_COUNT = parseInt(process.env["NEXT_PUBLIC_QUESTION_COUNT"]!);

interface QuestionContextType {
  target: number;
  answers: Answer[];
  questions: Question[];

  answersImpact: Impact;
  answersTransformed: AnswerTransformed[];

  resetEverything: () => void;

  setTarget: (target: number) => void;
  setAnswers: (answers: Answer[]) => void;
}

const QuestionContext = createContext<QuestionContextType>({
  target: 0,
  answers: [],
  questions: [],

  answersTransformed: [],
  answersImpact: {
    societalImpact: 0,
    employeeWellbeing: 0,
    financialPresentation: 0,
  },

  resetEverything: () => {},

  setTarget: (target: number) => {},
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
  const [busy, setBusy] = useState<boolean>(false);
  const [target, setTarget] = useState<number>(initialTarget);
  const [answers, setAnswers] = useState<Answer[]>(initialAnswers);
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);

  const company = useMemo(() => {
    const answerName = answers.find((answer) => answer.uuid === "4dfb8b90-a70e-47cc-a9f2-51608f86d04c");
    const answerMission = answers.find((answer) => answer.uuid === "76253f31-0daf-4fa5-908e-6538f7da5c16");
    const answerActivity = answers.find((answer) => answer.uuid === "0db64dd3-5440-49a4-9252-c0d8ba49fa62");

    return {
      name: answerName ? answerName.value : "Nog niet beantwoord, maar vraag er niet naar",
      mission: answerMission ? answerMission.value : "Nog niet beantwoord, maar vraag er niet naar",
      activity: answerActivity ? answerActivity.value : "Nog niet beantwoord, maar vraag er niet naar",
    };
  }, [answers]);

  const resetEverything = () => {
    Cookies.remove("target");
    Cookies.remove("company");
    Cookies.remove("answers");
    Cookies.remove("questions");

    setTarget(0);
    setAnswers([]);
    setQuestions([]);
  };

  useEffect(() => {
    // Only generate new questions if we have not reached the target yet
    if (questions.length >= target) {
      return;
    }

    // Prevent double fetching
    if (busy) {
      return;
    }

    const generateQuestion = async () => {
      setBusy(true);

      const questionsSimplified = questions.map((question) => question.question);
      const questionsResponse = await fetchQuestion(company, questions.length, QUESTION_COUNT, questionsSimplified);
      const questionsParsed = JSON.stringify([...questions, questionsResponse]);

      setBusy(false);
      setQuestions([...questions, questionsResponse]);

      Cookies.set("questions", questionsParsed);
    };

    generateQuestion();
  }, [target, questions.length]);

  const setAnswersWrapper = (answers: Answer[]) => {
    const answersJson = JSON.stringify(answers);

    Cookies.set("answers", answersJson);

    setAnswers(answers);
  };

  const setTargetWrapper = (target: number) => {
    const targetJson = JSON.stringify(target);

    Cookies.set("target", targetJson);

    setTarget(target);
  };

  const answersTransformed = useMemo(() => {
    return answers.map((answer) => {
      const question = questions.find((question) => question.uuid === answer.uuid)!;
      const choice = question.options?.find((choice) => choice.value === answer.value)!;

      return {
        title: question.title,
        question: question?.question,
        choice,
      };
    });
  }, [answers]);

  const answersImpact = useMemo(() => {
    return answersTransformed.reduce(
      (previousValue, currentValue) => {
        return {
          societalImpact: previousValue.societalImpact + currentValue.choice.impact.societalImpact,
          employeeWellbeing: previousValue.employeeWellbeing + currentValue.choice.impact.employeeWellbeing,
          financialPresentation: previousValue.financialPresentation + currentValue.choice.impact.financialPresentation,
        };
      },
      {
        societalImpact: 0,
        employeeWellbeing: 0,
        financialPresentation: 0,
      },
    );
  }, [answersTransformed]);

  return (
    <QuestionContext.Provider
      value={{
        target,
        answers,
        questions,

        answersImpact,
        answersTransformed,

        resetEverything,

        setTarget: setTargetWrapper,
        setAnswers: setAnswersWrapper,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionProvider;
