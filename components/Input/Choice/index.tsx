import styles from "./InputChoice.module.scss";

import { Choice, Option } from "../../../types";

type InputChoiceProps = {
  choice: Choice;
  onAnswer: (option: Option) => void;
};

export default function InputChoice({
  choice: { question, options },
  onAnswer,
}: InputChoiceProps) {
  return (
    <section className={styles.choice}>
      <h2 className={styles.choice__question}>{question}</h2>

      <menu className={styles.choice__options}>
        {options && options.map((option) => {
          return (
            <li key={option.value}>
              <button
                onClick={() => onAnswer(option)}
                className={styles.choice__options__option}
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
