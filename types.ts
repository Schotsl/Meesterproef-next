export type Question = {
  uuid: string;
  type: "choice" | "input";
  title: string;
  color: string;
  options?: Option[];
  question: string;
};

export type Option = {
  label: string;
  value: string;
  explain: string;
  impact: {
    financial_presentation: number;
    employee_wellbeing: number;
    societal_impact: number;
  };
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