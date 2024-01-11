import styles from "./InputText.module.scss";

import Spinner from "@/components/Spinner";

import { Question } from "../../../types";
import { useEffect, useState } from "react";

type InputTextProps = {
  loading: boolean;
  question: Question;
  onAnswer?: (answer: string) => void;
};

export default function InputText({ loading, question: { question, color }, onAnswer }: InputTextProps) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAnswer && onAnswer(answer);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  useEffect(() => {
    setAnswer("");
  }, [question]);

  return (
    <form className={styles.input_text} onSubmit={handleSubmit}>
      <label className={styles.input_text__label} style={{ opacity: loading ? 0.25 : 1 }}>
        {question}
      </label>

      <div className={styles.input_text__wrapper} style={{ opacity: loading ? 0.25 : 1 }}>
        <input
          type="text"
          value={answer}
          disabled={loading}
          onChange={handleChange}
          className={styles.input_text__input}
          placeholder="Type je antwoord hier"
        />

        <button
          type="submit"
          style={{ backgroundColor: color }}
          disabled={loading}
          className={styles.input_text__submit}
        >
          Volgende vraag
        </button>
      </div>

      {loading && <Spinner />}
    </form>
  );
}
