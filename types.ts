export type Choice = {
  uuid: string;
  type: "choice" | "input";
  color: string;
  options?: Option[];
  question: string;
};

export type Option = {
  label: string;
  value: string;
};
