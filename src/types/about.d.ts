import { Language } from "./experiences";

export type aboutSkillProps = {
  name: string;
  url: string;
};

export type aboutLanguageProps = {
  name: string;
  level: string;
  icon: string;
  order: number;
};

export type aboutProps = {
  id: string;
  descriptions: {
    translations: Record<Language, string[]>;
  };
  skills: aboutSkillProps[];
  language: Record<Language, aboutLanguageProps[]>;
};

export type aboutReturnProps = {
  id: string;
  description: string[];
  skills: aboutSkillProps[];
  languages: aboutLanguageProps[];
};
