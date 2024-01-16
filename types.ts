export type Question = {
  uuid: string;
  type: "choice" | "input";
  title: string;
  color: string;
  options?: Option[];
  question: string;
};

// TODO: Remove underscore
export type Impact = {
  financialPresentation: number;
  employeeWellbeing: number;
  societalImpact: number;
};

export type Option = {
  label: string;
  value: string;
  impact: Impact;
  explain: string;
};

export type Answer = {
  uuid: string;
  value: string;
};

export type AnswerTransformed = {
  title: string;
  choice: Option;
  question: string;
};

export type Company = {
  name: string;
  mission: string;
  activity: string;
};
