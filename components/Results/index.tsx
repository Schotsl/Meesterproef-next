import styles from "./Results.module.scss";
import Image from "next/image";
import { Answer, Question } from "../../types";

type ResultsProps = {
  answers: Answer[];
  questions: Question[];
};

import moneyIcon from "@/public/background/profit/1.png";
import societyIcon from "@/public/background/society/3.png";
import workersIcon from "@/public/background/workers/2.png";

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
      <div className={styles.results__list__item__wrapper}>
        <h3 className={styles.results__list__item__wrapper__title}>{question.title}</h3>

        {choice && (
          <>
            <ul className={styles.results__list__item__wrapper__impact}>
              <li className={styles.results__list__item__wrapper__impact__item}>
                <Image
                  className={styles.results__list__item__wrapper__impact__item__icon}
                  src={moneyIcon}
                  alt="Money icon"
                />

                <span
                  className={styles.results__list__item__wrapper__impact__item__slider}
                  style={{ width: `${50 * choice!.impact.employeeWellbeing + 50}%` }}
                ></span>
              </li>

              <li className={styles.results__list__item__wrapper__impact__item}>
                <Image
                  className={styles.results__list__item__wrapper__impact__item__icon}
                  src={workersIcon}
                  alt="Workers icon"
                />

                <span
                  className={styles.results__list__item__wrapper__impact__item__slider}
                  style={{ width: `${50 * choice!.impact.financialPresentation + 50}%` }}
                ></span>
              </li>

              <li className={styles.results__list__item__wrapper__impact__item}>
                <Image
                  className={styles.results__list__item__wrapper__impact__item__icon}
                  src={societyIcon}
                  alt="Society icon"
                />

                <span
                  className={styles.results__list__item__wrapper__impact__item__slider}
                  style={{ width: `${50 * choice!.impact.societalImpact + 50}%` }}
                ></span>
              </li>
            </ul>

            <p className={styles.results__list__item__wrapper__description}>{choice.explain}</p>
          </>
        )}
      </div>
    </li>
  );
}
