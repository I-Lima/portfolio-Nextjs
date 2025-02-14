import { LANGUAGES } from "@/constant/language";

export const i18n = {
  defaultLocale: "en",
  locales: LANGUAGES,
} as const;

export type Locale = (typeof i18n)["locales"][number];
