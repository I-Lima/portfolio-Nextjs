"use client";

import SectionTitle from "../../ui/SectionTitle";
import ButtonMore from "../../ui/ButtonMore";
import ServerListProjects from "./ServerListProjects";
import { GITHUB } from "@/constant/urls";
import { useDictionary } from "@/context/DictionaryContext";

export default function Projects() {
  const { dictionary: dictionaries } = useDictionary();
  const dictionary = dictionaries?.projects;
  if (!dictionary) return null;
  const _renderList = ServerListProjects();

  return (
    <div id="projects" className="flex flex-col max-w-screen w-full py-8 mb-20">
      <div className="flex flex-col items-start">
        <SectionTitle title={dictionary.section} />
      </div>

      <div
        className="
          grid justify-items-center gap-6
          md:grid-cols-2
          lg:px-4 lg:ap-4 lg:items-start lg:grid-cols-2
          2xl:grid-cols-3
        "
      >
        {_renderList()}
      </div>

      <div className="flex justify-start px-50 mt-14">
        <ButtonMore
          onClick={() => window.open(GITHUB.REPOSITORIES)}
          text={dictionary.more}
        />
      </div>
    </div>
  );
}
