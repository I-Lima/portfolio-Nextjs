"use client";
import SectionTitle from "@/components/ui/SectionTitle";
import ServerExperiences from "./ServerExperiences";
import Filter from "@/components/ui/Filter";
import Search from "@/components/ui/Search";
import { useDictionary } from "@/context/DictionaryContext";

export default function Experiences() {
  const { dictionary: dictionaries, lang } = useDictionary();
  const dictionary = dictionaries?.experiences;
  const dictionarySearch = dictionaries?.search;
  if (!dictionary || !dictionarySearch) return null;

  const _renderList = ServerExperiences(dictionaries, lang);

  return (
    <div
      id="experiences"
      className="flex flex-col h-full min-h-screen max-w-screen w-full pt-24 px-6 lg:px-12"
    >
      <div className="flex flex-row items-start justify-between pr-12">
        <SectionTitle title={dictionary.section} />

        <div className="hidden lg:flex flex-row gap-4">
          <Search placeholder={dictionarySearch.placeholder} />
          <Filter dictionary={dictionaries.filter} />
        </div>
      </div>

      <div className="flex lg:hidden flex-row justify-end items-center mb-12 gap-4">
        <Search placeholder={dictionarySearch.placeholder} />
        <Filter dictionary={dictionaries.filter} />
      </div>

      <div className="flex flex-col gap-8 justify-center lg:px-10">
        {_renderList}
      </div>
    </div>
  );
}
