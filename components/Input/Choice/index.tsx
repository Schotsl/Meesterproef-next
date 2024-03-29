import styles from "./InputChoice.module.scss";

import Spinner from "@/components/Spinner";

import { Question } from "../../../types";

type InputChoiceProps = {
  color: string;
  loading: boolean;
  question: Question;
  onAnswer?: (answer: string) => void;
};

export default function InputChoice({
  color,
  loading,
  question: { question, options, title },
  onAnswer,
}: InputChoiceProps) {
  const handleClick = (value: string) => {
    onAnswer && onAnswer(value);
  };

  return (
    <section className={styles.choice}>
      <h2 className={styles.choice__title} style={{ opacity: loading ? 0.25 : 1 }}>
        {title}
      </h2>

      <p className={styles.choice__question} style={{ opacity: loading ? 0.25 : 1 }}>
        {question}
      </p>

      <menu className={styles.choice__options} style={{ opacity: loading ? 0.25 : 1 }}>
        {options &&
          options.map((option) => {
            return (
              <li key={option.value} className={styles.choice__options__option}>
                <button
                  style={{ backgroundColor: color }}
                  onClick={() => handleClick(option.value)}
                  disabled={loading}
                  className={styles.choice__options__option__button}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
      </menu>

      {loading && <Spinner />}
    </section>
  );
}
