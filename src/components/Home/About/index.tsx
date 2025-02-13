"use client";
import React from "react";
import SectionTitle from "../../ui/SectionTitle";
import ServerListAbout from "./ServerListAbout";
import { useDictionary } from "@/context/DictionaryContext";

export default function About() {
  const { dictionary: dictionaries, lang } = useDictionary();
  const dictionary = dictionaries?.about;
  if (!dictionary) return null;

  const _renderComponent = ServerListAbout({ dictionary, lang });

  return (
    <div id="about" className="flex flex-col max-w-screen w-full py-8 mb-20">
      <div className="flex flex-col items-start">
        <SectionTitle title={dictionary.section} />
      </div>

      <div className="md:px-8 lg:px-0">{_renderComponent}</div>
    </div>
  );
}
