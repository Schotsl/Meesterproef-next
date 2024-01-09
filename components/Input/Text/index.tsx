import styles from "./InputText.module.scss";

import { useEffect, useState } from "react";

type InputTextProps = {
  question: string;
  onAnswer: (answer: string) => void;
};

export default function InputText({ question, onAnswer }: InputTextProps) {
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

      <input
        className={styles.input_text__input}
        type="text"
        placeholder="Type your answer here"
        onChange={handleChange}
      />

      <button className={styles.input_text__submit} type="submit">
        Submit
      </button>
    </form>
  );
}
