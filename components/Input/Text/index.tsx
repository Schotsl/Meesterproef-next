import styles from "./InputText.module.scss";

import { Question } from "../../../types";
import { useEffect, useState } from "react";

type InputTextProps = {
  question: Question;
  onAnswer: (answer: string) => void;
};

export default function InputText({ question: { question, color }, onAnswer }: InputTextProps) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAnswer(answer);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  useEffect(() => {
    setAnswer("");
  }, [question]);

  return (
    <form className={styles.input_text} onSubmit={handleSubmit}>
      <label className={styles.input_text__label}>{question}</label>

      <div className={styles.input_text__wrapper}>
        <input
          type="text"
          className={styles.input_text__input}
          placeholder="Type je antwoord hier"
          onChange={handleChange}
          value={answer}
        />

        <button type="submit" className={styles.input_text__submit} style={{ backgroundColor: color }}>
          Volgende vraag
        </button>
      </div>
    </form>
  );
}
