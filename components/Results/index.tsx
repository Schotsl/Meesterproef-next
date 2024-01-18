import styles from "./Results.module.scss";

import Image from "next/image";

import { useQuestion } from "@/context/QuestionContext";
import { Answer, Question } from "../../types";

import ResultsImpact from "@/components/Results/Impact";

import imageProfitFirst from "@/public/images/profit/1.jpg";
import imageProfitSecond from "@/public/images/profit/2.jpg";

type ResultsProps = {
  answers: Answer[];
  questions: Question[];
};

export default function Results({ answers, questions }: ResultsProps) {
  const { answersImpact } = useQuestion();

  return (
    <section className={styles.results}>
      <div className={styles.results__card}>
        <h2 className={styles.results__card__title}>Jou bedrijfsvorm match is een traditioneel bedrijf</h2>

        <ResultsImpact impact={answersImpact} />

        <section className={styles.results__card__section}>
          <h3 className={styles.results__card__subtitle}>Dit is wat jij belangrijk vindt</h3>
          <p>
            Op basis van jouw keuzes lijkt het traditionele bedrijfsmodel het beste bij jou te passen. Wat betekent dit
            precies?
          </p>

          <p>
            Een traditioneel bedrijf is vaak gestructureerd rond een duidelijke hiërarchie en eigendomsverhoudingen. In
            dit model zijn de aandeelhouders vaak de eigenaren van het bedrijf, en de besluitvorming is meestal in
            handen van een directie of managementteam.
          </p>
        </section>

        <section className={styles.results__card__section}>
          <h3>Kenmerken van een Traditioneel Bedrijf:</h3>

          <ul className={styles.results__card__list}>
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

          <section className={styles.results__card__section}>
            <p>
              Als eigenaar of manager binnen een traditioneel bedrijf heb je de kans om de strategische richting te
              bepalen en de groei van het bedrijf te sturen. Deze bedrijfsvorm biedt structuur en duidelijke
              richtlijnen, wat bijdraagt aan efficiëntie en effectieve besluitvorming.
            </p>
          </section>
        </section>
      </div>

      <div className={styles.results__images}>
        <div className={styles.results__images__wrapper}>
          <Image src={imageProfitFirst} alt="Profit first" className={styles.results__images__wrapper__image} />
        </div>

        <div className={styles.results__images__wrapper}>
          <Image src={imageProfitSecond} alt="Profit second" className={styles.results__images__wrapper__image} />
        </div>
      </div>

      <ul className={styles.results__list}>
        {questions.map((question, index) => (
          <ResultsItem
            key={index}
            index={index}
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
  index: number;
  answer?: Answer;
  question: Question;
};

function ResultsItem({ index, answer, question }: ResultsItemProps) {
  const choice = question.options?.find((option) => option.value === answer?.value);

  return (
    <li className={styles.results__list__item}>
      <div className={styles.results__list__item__wrapper}>
        <h4>Vraag {index + 1}</h4>
        <h3 className={styles.results__list__item__wrapper__title}>{question.title}</h3>

        {choice && (
          <>
            <ResultsImpact impact={choice.impact} />

            <p className={styles.results__list__item__wrapper__description}>{choice.explain}</p>
          </>
        )}
      </div>
    </li>
  );
}
