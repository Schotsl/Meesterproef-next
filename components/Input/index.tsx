import styles from "./Input.module.scss";

import InputText from "./Text";
import InputChoice from "./Choice";

import { Question } from "../../types";

type InputProps = {
  loading?: boolean;
  question: Question;
  onAnswer?: (answer: string) => void;
};

export default function Input({ loading = false, question, onAnswer }: InputProps) {
  return (
    <div className={styles.input}>
      {question.type === "input" && <InputText loading={loading} question={question} onAnswer={onAnswer} />}

      {question.type === "choice" && <InputChoice loading={loading} question={question} onAnswer={onAnswer} />}
    </div>
  );
}
