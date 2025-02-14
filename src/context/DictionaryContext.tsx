import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { Locale } from "../../i18n-config";
import { getDictionary } from "../getDictionary";
import { dictionariesProps } from "@/types/dictionaries";

type DictionaryContextType = {
  dictionary: dictionariesProps | null;
  lang: Locale;
};

const DictionaryContext = createContext<DictionaryContextType | undefined>(
  undefined,
);

export function DictionaryProvider({
  children,
  lang,
}: {
  children: ReactNode;
  lang: Locale;
}) {
  const [dictionary, setDictionary] = useState<dictionariesProps | null>(null);

  useEffect(() => {
    const loadDictionary = async () => {
      const dict = await getDictionary(lang);
      setDictionary(dict);
    };
    loadDictionary();
  }, [lang]);

  return (
    <DictionaryContext.Provider value={{ dictionary, lang }}>
      {children}
    </DictionaryContext.Provider>
  );
}

/**
 * Hook to access the current dictionary.
 *
 * Must be used within a {@link DictionaryProvider} component.
 *
 * @returns The current dictionary and the language.
 *
 * @throws An error if not used within a DictionaryProvider.
 */
export function useDictionary() {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error("useDictionary must be used within a DictionaryProvider");
  }
  return context;
}
