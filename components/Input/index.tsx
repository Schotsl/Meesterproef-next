import InputText from "./Text";
import InputChoice from "./Choice";

import { Choice } from "../../types";

type InputProps = {
  choice: Choice;
  onAnswer: (answer: string) => void;
};

export default function Input({ choice, onAnswer }: InputProps) {
  return (
    <>
      {choice.type === "input" && (
        <InputText question={choice.question} onAnswer={onAnswer} />
      )}

      {choice.type === "choice" && (
        <InputChoice choice={choice} onAnswer={onAnswer} />
      )}
    </>
  );
}
