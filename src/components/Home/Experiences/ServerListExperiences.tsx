import React, { useEffect, useState } from "react";
import {
  experienceHistoryReturnProps,
  experienceReturnProps,
  Language,
} from "@/types/experiences";
import Image from "next/image";
import experienceServices from "@/services/experienceServices";
import Tag from "@/components/ui/Tag";
import { dictionariesProps } from "@/types/dictionaries";
const dimensions = {
  height: 0,
  width: 0,
};

type Props = {
  dictionary: dictionariesProps["experiences"];
  lang: Language;
};

const ServerListExperiences = ({ dictionary, lang }: Props) => {
  const [dataExperience, setDataExperience] =
    useState<experienceReturnProps[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await experienceServices.getPreviewExperiencesData({
          lang,
          dictionary,
        });
        if (data) setDataExperience(data);
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
      <>
        <div className="flex flex-col w-md justify-center items-center lg:w-full">
          <div className="animate-pulse flex flex-col mt-4 transition-transform bg-customGray h-16 w-3/5" />

          <div className="animate-pulse flex flex-col mt-6 transition-transform w-full items-center">
            <div className="flex flex-row gap-8 w-full justify-center">
              <div className="bg-customGray h-12 w-56" />
              <div className="bg-customGray h-12 w-2/5" />
            </div>

            <div className="mt-4 flex flex-row bg-customGray h-56 w-2/5 justify-center" />

            <div className="mt-4 flex flex-row gap-4 max-w-80 lg:w-full">
              <div className="bg-customGray h-10 w-20 rounded" />
              <div className="bg-customGray h-10 w-20 rounded" />
              <div className="bg-customGray h-10 w-20 rounded" />
              <div className="bg-customGray h-10 w-20 rounded" />
              <div className="bg-customGray h-10 w-20 rounded" />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full justify-center items-center">
          <div className="animate-pulse flex flex-col mt-4 transition-transform bg-customGray h-16 w-3/5" />

          <div className="animate-pulse flex flex-col mt-6 transition-transform w-full items-center">
            <div className="flex flex-row gap-8 w-full justify-center">
              <div className="bg-customGray h-12 w-56" />
              <div className="bg-customGray h-12 w-2/5" />
            </div>

            <div className="mt-4 flex flex-row bg-customGray h-56 w-2/5 justify-center" />

            <div className="mt-4 flex flex-row gap-4 max-w-80 lg:w-full">
              <div className="bg-customGray h-10 w-20 rounded" />
              <div className="bg-customGray h-10 w-20 rounded" />
              <div className="bg-customGray h-10 w-20 rounded" />
              <div className="bg-customGray h-10 w-20 rounded" />
              <div className="bg-customGray h-10 w-20 rounded" />
            </div>
          </div>
        </div>
      </>
    );
  };

  const _renderError = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/gifs/error.gif"
          alt="error gif"
          width={dimensions.width / 2}
          height={dimensions.width / 2}
        />

        <p>An error has occurred. Try later</p>
      </div>
    );
  };

  const _renderList = (history: experienceHistoryReturnProps[]) => {
    return history.map((historyItem, i) => {
      const tagArray = historyItem.tags || [];

      return (
        <div
          key={i}
          className="
            flex flex-col justify-center mt-6
            md:flex-row md:w-full
            lg:mt-12
          "
        >
          <div className="hidden md:flex md:w-1/4 lg:w-fit">
            <p className="text-customGray">{`(${historyItem.entrance} - ${historyItem.output})`}</p>
          </div>

          <div
            className="
              flex flex-col
              md:w-3/4
              lg:max-w-xl
            "
          >
            <div className="flex flex-col px-1 lg:px-4">
              <div className="flex flex-col w-full justify-between mb-2">
                <p className="flex-wrap text-xl mb-1 font-bold">
                  {historyItem.role}
                </p>

                <p className="text-customGray sm:hidden">{`(${historyItem.entrance} - ${historyItem.output})`}</p>
              </div>

              <p className="flex flex-wrap text-justify text-lg px-1 lg:px-2">
                {historyItem.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-4 px-4 justify-start mb-2 lg:gap-4">
                {tagArray.map((tag, index) => (
                  <Tag key={index} tag={tag} />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  if (isLoading || !dataExperience) return _renderLoading();
  if (isError) return _renderError();

  return (
    <div>
      {dataExperience.map((item, i) => {
        return (
          <div key={i} className="flex justify-center">
            <div className="flex flex-col lg:max-w-3xl">
              <h3
                className="
                  text-2xl border-b-2 pb-1 text-center font-bold
                  md:text-3xl
                  lg:text-4xl
                "
              >
                {item.enterprise}
              </h3>

              <div className="flex flex-col px-4">
                {_renderList(item.history)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServerListExperiences;
