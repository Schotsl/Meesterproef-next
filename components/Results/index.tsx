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
      <div className={styles.results__card}>
        <h2 className={styles.results__title}>Jou uitslag!</h2>
        <h3 className={styles.results__subtitle}>Dit is wat jij belangrijk vindt</h3>
        <p>
          Op basis van jouw keuzes lijkt het traditionele bedrijfsmodel het beste bij jou te passen. Wat betekent dit
          precies?
        </p>

        <p>
          Een traditioneel bedrijf is vaak gestructureerd rond een duidelijke hiërarchie en eigendomsverhoudingen. In
          dit model zijn de aandeelhouders vaak de eigenaren van het bedrijf, en de besluitvorming is meestal in handen
          van een directie of managementteam.
        </p>

        <h3 className={styles.results__subtitle}>Kenmerken van een Traditioneel Bedrijf:</h3>

        <ul>
          <li>
            <b>Aandeelhouderschap</b>: De aandeelhouders bezitten het bedrijf en hun stemrecht is vaak gerelateerd aan
            het aantal aandelen dat ze hebben.
          </li>
          <li>
            <b>Winstgericht</b>: Het primaire doel is het maximaliseren van de winst voor aandeelhouders.
          </li>
          <li>
            <b>Top-down Management</b>: Beslissingen worden genomen door hoger management en doorgevoerd binnen de
            organisatie.
          </li>
          <li>
            <b>Groei en Uitbreiding</b>: De focus ligt vaak op het vergroten van marktaandeel en het verhogen van de
            omzet.
          </li>
          <li>
            <b>Marktcompetitie</b>: Sterke focus op het concurreren in de markt om de beste producten of diensten te
            leveren tegen de meest winstgevende prijzen.
          </li>
        </ul>

        <p>
          Als eigenaar of manager binnen een traditioneel bedrijf heb je de kans om de strategische richting te bepalen
          en de groei van het bedrijf te sturen. Deze bedrijfsvorm biedt structuur en duidelijke richtlijnen, wat
          bijdraagt aan efficiëntie en effectieve besluitvorming.
        </p>
      </div>

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
