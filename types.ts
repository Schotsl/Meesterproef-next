export type Question = {
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

export type Answer = {
  uuid: string;
  value: string;
};

export type Company = {
  name: string;
  activity: string;
  mission: string;
};
