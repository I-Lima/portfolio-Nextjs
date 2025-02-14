import { LANGUAGES } from "@/constant/language";

type languageProps = {
  role: string;
  description: string;
  entrance
  output
};

export type Language = (typeof LANGUAGES)[number];

export type experienceHistoryProps = {
  translations: Record<Language, languageProps>;
  tags: string[];
  project_website: string | null;
  type: string;
};

export type experienceProps = {
  id: string;
  enterprise: string;
  output: number | null;
  company_website: string;
  history: experienceHistoryProps[];
};

export type experienceHistoryReturnProps = languageProps & {
  tags: string[];
  entrance: string;
  output: string | null;
  project_website: string | null;
  type: string;
};

export type experienceReturnProps = {
  id: string;
  enterprise: string;
  output: number | null;
  company_website: string;
  history: experienceHistoryReturnProps[];
};
