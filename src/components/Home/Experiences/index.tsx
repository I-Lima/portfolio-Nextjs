"use client";

import SectionTitle from "../../ui/SectionTitle";
import ServerListExperiences from "./ServerListExperiences";
import ButtonMore from "../../ui/ButtonMore";
import { useDictionary } from "@/context/DictionaryContext";

export default function Experiences() {
  const { dictionary: dictionaries, lang } = useDictionary();
  const dictionary = dictionaries?.experiences;
  if (!dictionary) return null;

  const _renderList = ServerListExperiences({ dictionary, lang });

  return (
    <div id="experiences" className="flex flex-col max-w-screen w-full mb-20">
      <div className="flex flex-col items-start">
        <SectionTitle title={dictionary.section} />
      </div>

      <div className="flex flex-col gap-8 justify-center md:px-8">
        {_renderList}

        <div className="flex flex-wrap justify-start px-50">
          <ButtonMore projects text={dictionary.more} />
        </div>
      </div>
    </div>
  );
}
