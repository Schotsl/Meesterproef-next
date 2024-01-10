import styles from "./Input.module.scss";

import InputText from "./Text";
import InputChoice from "./Choice";

import { Question } from "../../types";

type InputProps = {
  question: Question;
  onAnswer: (answer: string) => void;
};

export default function Input({ question, onAnswer }: InputProps) {
  return (
    <div className={styles.input}>
      {question.type === "input" && (
        <InputText question={question} onAnswer={onAnswer} />
      )}

      {question.type === "choice" && (
        <InputChoice question={question} onAnswer={onAnswer} />
      )}
    </div>
  );
}
