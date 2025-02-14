"use client"

import { LANGUAGES } from "@/constant/language";
import { dictionariesProps } from "@/types/dictionaries";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface LanguageSwitchProps {
  lang: typeof LANGUAGES[number];
  dictionary: dictionariesProps["languageSwitch"];
}

function LanguageSwitch({lang, dictionary}: LanguageSwitchProps) {
  const [open, setOpen] = useState(false);

  const _handleOpen = () => setOpen(!open);

  const changeLanguage = (language: typeof LANGUAGES[number]) => {
    window.location.href = `/${language}`;
  }

  const _renderList = () => {
    return (
      <div>
        {LANGUAGES.map((item, i) => (
          <div
            key={i}
            className="flex flex-row border-2 rounded-md px-3 py-1 hover:cursor-pointer bg-white items-center"
            onClick={() => changeLanguage(item)}
          >
            <p className="text-black text-lg">{item}</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
          <div
            className="hidden md:flex flex-row border-2 rounded-md px-3 py-1 gap-2 hover:cursor-pointer border-customBlue bg-white items-center"
            onClick={() => _handleOpen()}
          >
            <p className="text-black text-lg">{dictionary.language}: {lang}</p>
            <IoIosArrowDown size={24} color="black" />
          </div>

          <div
            className={`absolute mt-14 right-4 w-24 bg-bgWhite rounded-md z-10 transition duration-150 ease-in ${open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
          >
            {_renderList()}
          </div>
        </div>
  )
}

export default LanguageSwitch;
