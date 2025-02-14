import React, { useEffect, useState } from "react";
import aboutServices from "@/services/aboutServices";
import { aboutReturnProps } from "@/types/about";
import { dictionariesProps } from "@/types/dictionaries";
import Image from "next/image";
import { GITHUB, LINKEDIN, MAIL, MEDIUM } from "@/constant/urls";
import Photo from "../../ui/Photo";
import { Language } from "@/types/experiences";
const dimensions = {
  height: 0,
  width: 0,
};

interface Props {
  dictionary: dictionariesProps["about"];
  lang: Language;
}

const ServerListAbout = ({ dictionary, lang }: Props) => {
  const [dataAbout, setDataAbout] = useState<aboutReturnProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await aboutServices.getAboutData(lang);
        if (data) setDataAbout(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    dimensions.height = window.innerHeight;
    dimensions.width = window.innerWidth;

    loadData();
  }, []);

  const _renderLoading = () => {
    return (
      <div className="flex flex-col w-screen gap-20 lg:flex-row">
        <div className="animate-pulse flex flex-col mt-4 transition-transform w-2/3 justify-start">
          <div className="flex flex-row items-center ">
            <div className="bg-customGray h-16 w-1/2 mr-24" />
            <div
              className="bg-customGray mt-4"
              style={{
                borderRadius: dimensions.width / 2,
                width: dimensions.width / 7,
                height: dimensions.width / 7,
              }}
            />
          </div>

          <div className="bg-customGray h-48 w-/4 mt-8" />

          <div className="mt-4 flex flex-row gap-4">
            <div className="bg-customGray h-8 w-8 rounded-3xl" />
            <div className="bg-customGray h-8 w-8 rounded-3xl" />
            <div className="bg-customGray h-8 w-8 rounded-3xl" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="animate-pulse flex flex-col mt-4 transition-transform w-2/3 justify-start">
            <div className="bg-customGray h-8 w-56" />

            <div className="mt-4 flex flex-row gap-4 md:flex-wrap md:max-w-md">
              <div className="bg-customGray h-16 w-16 rounded lg:h-20 lg:w-20" />
              <div className="bg-customGray h-16 w-16 rounded lg:h-20 lg:w-20" />
              <div className="bg-customGray h-16 w-16 rounded lg:h-20 lg:w-20" />
              <div className="bg-customGray h-16 w-16 rounded lg:h-20 lg:w-20" />
              <div className="bg-customGray h-16 w-16 rounded lg:h-20 lg:w-20" />
            </div>
          </div>

          <div className="animate-pulse flex flex-col mt-4 transition-transform w-2/3 justify-start">
            <div className="bg-customGray h-8 w-56" />

            <div className="mt-4 flex flex-col gap-4 md:flex-wrap">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-row gap-2 align-center">
                  <div className="bg-customGray h-4 w-16" />
                  <div className="bg-customGray h-1 w-2 rounded self-center" />
                  <div className="bg-customGray h-4 w-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const _renderError = () => {
    return (
      <div className="flex flex-col items-start justify-center">
        <Image src="/gifs/error.gif" alt="error gif" width={300} height={300} />

        <p>{dictionary.msgError}</p>
      </div>
    );
  };

  const _description = () => {
    if (isError) return _renderError();

    return (dataAbout?.description || []).map((line, index) => (
      <p
        className="mb-4 text-lg text-justify"
        key={index}
        style={{ whiteSpace: "pre-line" }}
      >
        {line}
      </p>
    ));
  };

  const _skillsList = () => {
    if (isError) return _renderError();

    return (dataAbout?.skills || []).map((skill, i) => (
      <div key={i} className="relative h-8 w-8 md:h-11 md:w-11 lg:w-12 lg:h-12">
        <Image src={skill.url} layout="fill" alt="my skills" />
      </div>
    ));
  };

  const _languagesList = () => {
    if (isError) return _renderError();

    return (dataAbout?.languages || []).map((skill, i) => (
      <div key={i} className="flex flex-row gap-3">
        <Image
          src={"/images/" + skill.icon + ".png"}
          width={32}
          height={32}
          alt="language flag"
        />
        <p className="text-md lg:text-lg font-bold">
          {skill.name} - {skill.level}
        </p>
      </div>
    ));
  };

  if (isLoading) return _renderLoading();

  return (
    <div
      className="
        flex flex-col justify-center w-full gap-2
        lg:flex-row lg:justify-between lg:px-6
      "
    >
      <div
        className="
          flex flex-col
          lg:max-w-4xl lg:flex-1 lg:mr-10
        "
      >
        <div
          className="
            flex flex-row items-center justify-between w-full
          "
        >
          <h2
            className="
              text-3xl mb-4
              md:text-4xl
            "
          >
            {dictionary.name} Ingrid Lima
          </h2>

          <Photo />
        </div>

        <div>{_description()}</div>

        <div className="mt-10 grid grid-cols-4 gap-0 max-w-sm">
          <button
            className="relative w-12 h-12 bg-bgBlack rounded-full"
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
            className="relative w-12 h-12 bg-bgBlack rounded-full"
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
            className="relative w-12 h-12 bg-bgBlack rounded-full"
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
            className="relative w-12 h-12 bg-bgBlack rounded-full"
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
      </div>

      <div
        className="
          flex flex-col gap-10 w-full
          md:flex-row md:justify-between
          lg:max-w-lg  lg:flex-1
          xl:max-w-xl xl:mr-10
        "
      >
        <div
          className="
            flex flex-col justify-start mt-10
            md:max-w-md
            lg:flex-1
          "
        >
          <h2
            className="
              text-3xl font-bold underline
              lg:text-4xl
            "
          >
            {dictionary.skills}
          </h2>

          <div
            className="
              flex flex-wrap items-center justify-start mt-8 gap-4 ml-4
              lg:max-w-full
            "
          >
            {_skillsList()}
          </div>
        </div>

        <div
          className="
            flex flex-col justify-start mt-10
            md:max-w-full
            lg:flex-1
          "
        >
          <h2
            className="
              text-3xl font-bold underline
              lg:text-4xl
            "
          >
            {dictionary.languages}
          </h2>

          <div className="flex flex-col items-start justify-start mt-8 gap-4 ml-4">
            {_languagesList()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerListAbout;
