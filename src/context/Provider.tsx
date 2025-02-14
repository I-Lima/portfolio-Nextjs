"use client";

import { ThemeProvider } from "next-themes";
import { DictionaryProvider } from "@/context/DictionaryContext";
import { Locale } from "../../i18n-config";

export function Providers({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Locale;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <DictionaryProvider lang={lang}>{children}</DictionaryProvider>
    </ThemeProvider>
  );
}
