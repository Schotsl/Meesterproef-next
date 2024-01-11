import styles from "./Results.module.scss";

import { Answer, Question } from "../../types";

type ResultsProps = {
  answers: Answer[];
  questions: Question[];
};

export default function Results({ answers, questions }: ResultsProps) {
  return (
    <section className={styles.results}>
      {/* <h2 className={styles.results__title}>Your results</h2> */}

      <ul className={styles.results__list}>
        {questions.map((question, index) => (
          <ResultsItem
            key={index}
            question={question}
            answer={answers.find((answer) => {
              return answer.uuid === question.uuid;
            })}
          />
        ))}
      </ul>
    </section>
  );
}

type ResultsItemProps = {
  answer?: Answer;
  question: Question;
};

function ResultsItem({ answer, question }: ResultsItemProps) {
  const choice = question.options?.find((option) => option.value === answer?.value);

  return (
    <li className={styles.results__list__item}>
      <h3 className={styles.results__list__item__title}>{question.title}</h3>

      <p className={styles.results__list__item__question}>{question.question}</p>

      <b className={styles.results__list__item__answer}>{choice?.label}</b>
    </li>
  );
}
