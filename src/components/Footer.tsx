"use client";

import { GITHUB, LINKEDIN, MAIL, MEDIUM } from "@/constant/urls";
import Image from "next/image";
import { useDictionary } from "@/context/DictionaryContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { dictionary: dictionaries } = useDictionary();
  const dictionary = dictionaries?.footer;

  if (!dictionary) return null;

  return (
    <div className="w-screen max-w-screen bg-customBlue h-56 items-center flex flex-col justify-center gap-12">
      <div className="flex flex-row gap-6 max-w-sm">
        <button
          className="relative w-12 h-12"
          onClick={() => window.open(LINKEDIN)}
        >
          <Image
            src="/images/linkedin_icon_transparent.svg"
            alt="linkedin icon"
            layout="fill"
            objectFit="cover"
          />
        </button>

        <button
          className="relative w-12 h-12"
          onClick={() => window.open(GITHUB.PROFILE)}
        >
          <Image
            src="/images/github_icon_transparent.svg"
            alt="github icon"
            layout="fill"
            objectFit="cover"
          />
        </button>

        <button
          className="relative w-12 h-12"
          onClick={() => window.open(MEDIUM)}
        >
          <Image
            src="/images/medium_icon_transparent.svg"
            alt="medium icon"
            layout="fill"
            objectFit="cover"
          />
        </button>

        <button
          className="relative w-12 h-12"
          onClick={() => window.open(MAIL)}
        >
          <Image
            src="/images/mail_icon_transparent.svg"
            alt="mail icon"
            layout="fill"
            objectFit="cover"
          />
        </button>
      </div>

      <div className="flex flex-row gap-2 text-white">
        <p className="text-center self-center">{dictionary.developedBy} </p>

        <Image
          src="/images/logoWithStroke.svg"
          width={100}
          height={50}
          alt="logo"
        />

        <p className="text-center self-center">© {currentYear}</p>
      </div>
    </div>
  );
}
