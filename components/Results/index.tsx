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

      {choice && (
        <>
          <ul className={styles.results__list__item__impact}>
            <li className={styles.results__list__item__impact__item}>
              <span
                className={styles.results__list__item__impact__item__slider}
                style={{ width: `${(choice!.impact.employeeWellbeing + 1) * 50}%` }}
              ></span>
            </li>

            <li className={styles.results__list__item__impact__item}>
              <span
                className={styles.results__list__item__impact__item__slider}
                style={{ width: `${(choice!.impact.financialPresentation + 1) * 50}%` }}
              ></span>
            </li>

            <li className={styles.results__list__item__impact__item}>
              <span
                className={styles.results__list__item__impact__item__slider}
                style={{ width: `${(choice!.impact.societalImpact + 1) * 50}%` }}
              ></span>
            </li>
          </ul>

          <p className={styles.results__list__item__description}>{choice.explain}</p>
        </>
      )}
    </li>
  );
}
