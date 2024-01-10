import styles from "./InputChoice.module.scss";

import { Question } from "../../../types";

type InputChoiceProps = {
  question: Question;
  onAnswer: (answer: string) => void;
};

export default function InputChoice({
  question: { question, options, color },
  onAnswer,
}: InputChoiceProps) {
  return (
    <section className={styles.choice}>
      <h2 className={styles.choice__question}>{question}</h2>

      <menu className={styles.choice__options}>
        {options &&
          options.map((option) => {
            return (
              <li key={option.value} className={styles.choice__options__option}>
                <button
                  style={{ backgroundColor: color }}
                  onClick={() => onAnswer(option.value)}
                  className={styles.choice__options__option__button}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
      </menu>
    </section>
  );
}
