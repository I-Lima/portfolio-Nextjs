"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import { LINKEDIN, MAIL } from "@/constant/urls";
import { useDictionary } from "@/context/DictionaryContext";
import Image from "next/image";

export default function Contact() {
  const { dictionary: dictionaries } = useDictionary();
  const dictionary = dictionaries?.contact;

  if (!dictionary) return null;

  function _renderCardComponent(
    children?: React.ReactNode,
    onClick?: () => void,
  ) {
    return (
      <button
        className="mb-12 flex items-center justify-center"
        onClick={onClick}
      >
        <div className="flex items-center bg-customBlue px-12 py-10 rounded-lg rotate-2">
          <h2 className="text-3xl invisible">{children}</h2>
        </div>

        <div className="absolute flex px-10 py-8 rounded-lg bg-bgWhite dark:bg-bgBlack">
          <h2 className="text-3xl">{children}</h2>
        </div>
      </button>
    );
  }

  return (
    <div id="contact" className="flex flex-col max-w-screen w-full py-8 mb-20">
      <div className="flex flex-col items-start">
        <SectionTitle title={dictionary.section} />
      </div>

      <div className="flex flex-col items-center mt-12">
        <p className="text-lg text-center max-w-2xl">
          {dictionary.description}
        </p>

        <div className="flex flex-col gap-4 mt-24 md:flex-row md:gap-12">
          {_renderCardComponent(
            <div className="flex flex-col items-center">
              <Image
                src="/images/linkedin_bgd.svg"
                alt="linkedin icon"
                width={60}
                height={60}
                className="mb-4"
                lazyRoot="true"
              />
              <p className="text-lg text-center max-w-2xl">Ingrid Lima</p>
            </div>,
            () => window.open(LINKEDIN),
          )}
          {_renderCardComponent(
            <div className="flex flex-col items-center">
              <Image
                src="/images/mail_icon_2.svg"
                alt="Mail icon"
                width={60}
                height={60}
                className="mb-4"
                lazyRoot="true"
              />
              <p className="text-lg text-center max-w-2xl">
                ibezerradelima@gmail.com
              </p>
            </div>,
            () => window.open(MAIL),
          )}
        </div>
      </div>
    </div>
  );
}
