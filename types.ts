export type Choice = {
  uuid: string;
  type: "choice" | "input";
  options?: Option[];
  question: string;
};

export type Option = {
  label: string;
  value: string;
};
