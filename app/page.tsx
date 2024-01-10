import Intro from "@/components/Intro";

import { cookies } from "next/headers";

export default function Home() {
  const cookie = cookies();

  const answersCookies = cookie.get("answers");
  const answersParsed = answersCookies ? JSON.parse(answersCookies.value) : [];

  const questionsCookies = cookie.get("questions");
  const questionsParsed = questionsCookies ? JSON.parse(questionsCookies.value) : [];

  return <Intro initialAnswers={answersParsed} initialQuestions={questionsParsed} />;
}

// https://alvarotrigo.com/blog/animated-backgrounds-css/
