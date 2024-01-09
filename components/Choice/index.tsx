import styles from "./Choice.module.scss";

import { Choice, Option } from "../../types";

type ChoiceProps = {
  choice: Choice;
  onAnswer: (option: Option) => void;
};

export default function Choice({
  choice: { question, options },
  onAnswer,
}: ChoiceProps) {
  return (
    <section className={styles.choice}>
      <h2 className={styles.choice__question}>{question}</h2>

      <menu className={styles.choice__options}>
        {options.map((option) => {
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
