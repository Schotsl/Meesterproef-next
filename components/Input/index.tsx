import styles from "./Input.module.scss";

import InputText from "./Text";
import InputChoice from "./Choice";

import { Choice } from "../../types";

type InputProps = {
  choice: Choice;
  onAnswer: (answer: string) => void;
};

export default function Input({ choice, onAnswer }: InputProps) {
  return (
    <div className={styles.input}>
      {choice.type === "input" && (
        <InputText choice={choice} onAnswer={onAnswer} />
      )}

      {choice.type === "choice" && (
        <InputChoice choice={choice} onAnswer={onAnswer} />
      )}
    </div>
  );
}
