type aboutProps = {
  section: string;
  msgError: string;
  name: string;
  skills: string;
  languages: string;
};
type bannerProps = {
  hi: string;
  myName: string;
  iAm: string;
};
type contactProps = {
  section: string;
  description: string;
};
type experiencesProps = {
  section: string;
  more: string;
  currently: string;
  companyButton: string;
  projectButton: string;
};
type homeProps = {
  moreInfo: string;
};
type projectsProps = {
  section: string;
  more: string;
  msgError: string;
};
type footerProps = {
  developedBy: string;
};
type searchProps = {
  placeholder: string;
};
type filterProps = {
  filter: string;
  type: string;
};

type languageSwitchProps = {
  language: string;
}

export type dictionariesProps = {
  about: aboutProps;
  banner: bannerProps;
  contact: contactProps;
  experiences: experiencesProps;
  home: homeProps;
  projects: projectsProps;
  footer: footerProps;
  search: searchProps;
  filter: filterProps;
  languageSwitch: languageSwitchProps
};
