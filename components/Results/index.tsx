import styles from "./Results.module.scss";

import Image from "next/image";

import { useQuestion } from "@/context/QuestionContext";
import { Answer, Impact, Question } from "../../types";

import ResultsImpact from "@/components/Results/Impact";

import imageProfitFirst from "@/public/images/profit/1.jpg";
import imageProfitSecond from "@/public/images/profit/2.jpg";

import imageSocietyFirst from "@/public/images/society/1.jpg";
import imageSocietySecond from "@/public/images/society/2.png";

import imageWorkersFirst from "@/public/images/workers/1.jpg";
import imageWorkersSecond from "@/public/images/workers/2.jpg";

type ResultsProps = {
  answers: Answer[];
  questions: Question[];
};

export default function Results({ answers, questions }: ResultsProps) {
  const { answersImpact } = useQuestion();
  const { employeeWellbeing, financialPresentation, societalImpact } = answersImpact;

  const largest = Math.max(employeeWellbeing, financialPresentation, societalImpact);

  return (
    <section className={styles.results}>
      {/* Show the right intro based on the largest impact */}
      {largest === employeeWellbeing ? (
        <ResultsIntroWorkers impact={answersImpact} />
      ) : largest === financialPresentation ? (
        <ResultsIntroProfit impact={answersImpact} />
      ) : (
        <ResultsIntroSociety impact={answersImpact} />
      )}

      <div className={styles.results__images}>
        <div className={styles.results__images__wrapper}>
          {largest === employeeWellbeing ? (
            <Image src={imageWorkersFirst} alt="Workers first" className={styles.results__images__wrapper__image} />
          ) : largest === financialPresentation ? (
            <Image src={imageProfitFirst} alt="Profit first" className={styles.results__images__wrapper__image} />
          ) : (
            <Image src={imageSocietyFirst} alt="Society first" className={styles.results__images__wrapper__image} />
          )}
        </div>

        <div className={styles.results__images__wrapper}>
          {largest === employeeWellbeing ? (
            <Image src={imageWorkersSecond} alt="Workers first" className={styles.results__images__wrapper__image} />
          ) : largest === financialPresentation ? (
            <Image src={imageProfitSecond} alt="Profit first" className={styles.results__images__wrapper__image} />
          ) : (
            <Image src={imageSocietySecond} alt="Society first" className={styles.results__images__wrapper__image} />
          )}
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
        <h4 className={styles.results__list__item__wrapper__question}>Vraag {index + 1}</h4>
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

type ResultsIntroProps = {
  impact: Impact;
};

// TODO: Move this into a seperate component
function ResultsIntroProfit({ impact }: ResultsIntroProps) {
  return (
    <div className={styles.results__card}>
      <h2 className={styles.results__card__title}>Je hebt je bedrijf gestuurd als een Traditioneel Bedrijf</h2>

      <ResultsImpact impact={impact} />

      <section className={styles.results__card__section}>
        <h3 className={styles.results__card__subtitle}>Gericht op Winstmaximalisatie</h3>
        <p>
          Je lijkt het best te passen bij een traditioneel bedrijfsmodel. Dit is het meest voorkomende model, waarbij de
          focus ligt op winstmaximalisatie voor aandeelhouders.
        </p>
      </section>

      <section className={styles.results__card__section}>
        <h3>Kenmerken van een Traditioneel Bedrijf:</h3>

        <ul className={styles.results__card__list}>
          <li>
            <b>Aandeelhouderschap</b>: De aandeelhouders zijn de eigenaren en profiteren van de winsten.
          </li>
          <li>
            <b>Top-down Besluitvorming</b>: Beslissingen worden genomen door het management en uitgevoerd door de
            werknemers.
          </li>
          <li>
            <b>Winstmaximalisatie</b>: De primaire focus ligt op het maximaliseren van de winst voor aandeelhouders.
          </li>
          <li>
            <b>Marktgericht</b>: Sterke focus op marktpositie en concurrentievermogen.
          </li>
        </ul>

        <section className={styles.results__card__section}>
          <p>
            Een traditioneel bedrijf biedt duidelijke structuren en processen, wat kan leiden tot efficiënte
            besluitvorming en snelle groei. De focus op winstmaximalisatie kan innovatie stimuleren en de
            concurrentiepositie versterken. Echter, dit model kan soms kortetermijnwinsten boven langetermijnwaarden en
            maatschappelijke verantwoordelijkheid stellen. Dit heeft in sommige gevallen geleid tot kritiek op gebieden
            zoals werknemersrechten, milieu-impact en ethische praktijken. Het is belangrijk om een balans te vinden
            tussen het creëren van aandeelhouderswaarde en het handhaven van een verantwoorde bedrijfsvoering.
          </p>
        </section>
      </section>
    </div>
  );
}

function ResultsIntroSociety({ impact }: ResultsIntroProps) {
  return (
    <div className={styles.results__card}>
      <h2 className={styles.results__card__title}>Je hebt je bedrijf gestuurd als een Steward Ownership</h2>

      <ResultsImpact impact={impact} />

      <section className={styles.results__card__section}>
        <h3 className={styles.results__card__subtitle}>Gericht op Maatschappelijke Impact</h3>
        <p>
          Jouw ideale match lijkt steward ownership te zijn, een model waarbij het bedrijf dient als steward voor een
          groter doel.
        </p>
      </section>

      <section className={styles.results__card__section}>
        <h3>Kenmerken van Steward Ownership:</h3>
        <ul className={styles.results__card__list}>
          <li>
            <b>Missiegericht</b>: De focus ligt op het realiseren van een bredere maatschappelijke of ecologische
            missie.
          </li>
          <li>
            <b>Beperkte Winstuitkering</b>: Winsten worden voornamelijk hergebruikt voor het behalen van de
            bedrijfsmissie.
          </li>
          <li>
            <b>Lange Termijn Stabiliteit</b>: Beslissingen zijn gericht op duurzaamheid en langetermijnvoordelen.
          </li>
          <li>
            <b>Zelfbestuur</b>: Het bedrijf wordt bestuurd met de missie als leidraad, vaak door een mix van werknemers,
            oprichters en externe belanghebbenden.
          </li>
        </ul>

        <section className={styles.results__card__section}>
          <p>
            Bij steward ownership draait het om het behouden van de kernwaarden en missie van het bedrijf op lange
            termijn. Dit model is bijzonder geschikt voor bedrijven die zich richten op duurzaamheid, sociale impact of
            innovatie. Het beschermt het bedrijf tegen overnames die de missie kunnen aantasten en zorgt voor een
            stabiele bedrijfsvoering. Echter, het kan soms moeilijk zijn om grote investeringen aan te trekken, omdat
            winstuitkering beperkt is en de focus ligt op de missie in plaats van op financiële winst.
          </p>
        </section>
      </section>
    </div>
  );
}

function ResultsIntroWorkers({ impact }: ResultsIntroProps) {
  return (
    <div className={styles.results__card}>
      <h2 className={styles.results__card__title}>Je hebt je bedrijf gestuurd als een Werknemerscoöperatie</h2>

      <ResultsImpact impact={impact} />

      <section className={styles.results__card__section}>
        <h3 className={styles.results__card__subtitle}>Gericht op Werknemerswelzijn</h3>
        <p>
          Gefeliciteerd! Op basis van jouw keuzes lijkt een werknemerscoöperatie het beste bij jou te passen. In een
          werknemerscoöperatie zijn de werknemers samen eigenaar van het bedrijf, wat leidt tot een unieke
          bedrijfscultuur en besluitvorming.
        </p>
      </section>

      <section className={styles.results__card__section}>
        <h3>Kenmerken van een Werknemerscoöperatie:</h3>

        <ul className={styles.results__card__list}>
          <li>
            <b>Democratische Besluitvorming</b>: Elke werknemer heeft een stem in belangrijke beslissingen.
          </li>
          <li>
            <b>Gedeeld Eigendom</b>: Werknemers delen in de winst en het eigendom van het bedrijf.
          </li>
          <li>
            <b>Focus op Werknemerswelzijn</b>: Sterke nadruk op werknemerstevredenheid en een gezonde werkomgeving.
          </li>
          <li>
            <b>Lange Termijn Focus</b>: Beslissingen worden genomen met oog op lange termijn voordelen voor werknemers
            en het bedrijf.
          </li>
        </ul>

        <section className={styles.results__card__section}>
          <p>
            Een werknemerscoöperatie stimuleert een cultuur van samenwerking en gemeenschappelijk eigenaarschap. Het
            zorgt voor een diepere betrokkenheid bij het bedrijf, omdat werknemers niet alleen werken voor een salaris,
            maar ook meebeslissen en meedelen in de successen. Dit kan leiden tot een sterkere interne cultuur en hogere
            werknemerstevredenheid. Echter, de uitdagingen kunnen liggen in het bereiken van consensus bij belangrijke
            beslissingen en het balanceren van individuele belangen met die van de coöperatie als geheel.
          </p>
        </section>
      </section>
    </div>
  );
}
