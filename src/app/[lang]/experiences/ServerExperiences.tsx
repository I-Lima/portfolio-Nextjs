import { useEffect, useState } from "react";
import experienceServices from "@/services/experienceServices";
import { experienceHistoryReturnProps } from "@/types/experiences";
import Image from "next/image";
import Tag from "@/components/ui/Tag";
import ButtonCustom from "@/components/ui/Button";
import { useExperienceStore } from "@/hooks/stateHooks";
import { dictionariesProps } from "@/types/dictionaries";
const dimensions = {
  height: 0,
  width: 0,
};

const ServerExperiences = (dictionary: dictionariesProps, lang: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { setExperienceData, filteredExperienceData } = useExperienceStore(
    (state) => state,
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await experienceServices.getAllExperienceData({
          dictionary: dictionary["experiences"],
          lang: lang,
        });
        if (data) setExperienceData(data, dictionary["filter"]);
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
        <div className="flex flex-col w-full justify-start items-start h-screen">
          <div className="animate-pulse mt-4 transition-transform bg-customGray h-16 w-2/4" />

          <div className="flex flex-col w-full mt-8 lg:flex-row">
            <div className="flex flex-col w-full">
              <div className="animate-pulse mt-4 transition-transform bg-customGray h-10 w-2/5" />
              <div className="animate-pulse mt-4 transition-transform bg-customGray h-10 w-1/5" />

              <div className="animate-pulse transition-transform bg-customGray h-48 w-3/5 mt-8" />
            </div>

            <div className="flex flex-col w-1/2">
              <div className="animate-pulse transition-transform bg-customGray h-12 w-32 mt-8" />

              <div className="animate-pulse transition-transform flex flex-row mt-8 gap-4">
                <div className="bg-customGray h-12 w-32 rounded" />
                <div className="bg-customGray h-12 w-32 rounded" />
                <div className="bg-customGray h-12 w-32 rounded" />
              </div>
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

  const _renderList = (data: experienceHistoryReturnProps[]) => {
    return data.map((item, i) => {
      const tagArray = item.tags || [];

      return (
        <div key={i} className="flex flex-col mt-2 mb-16 lg:mt-4">
          <div className="flex flex-col justify-between gap-6 lg:flex-row">
            <div className="flex flex-col justify-between max-w-xl md:max-w-full lg:max-w-3xl">
              <div className="flex flex-col">
                <p className="text-2xl font-bold">{item.role}</p>
                <div className="text-xl font-bold mt-1">{`(${item.entrance} - ${item.output})`}</div>
              </div>

              <div className="mt-4 text-justify text-lg">
                {item.description}
              </div>
            </div>

            <div className="flex flex-col items-start justify-start lg:max-w-xl">
              <p className="border-b-2 text-2xl">Skills</p>

              <div className="flex flex-wrap gap-4 mt-4 px-4 lg:px-6">
                {tagArray.map((tag, index) => (
                  <Tag key={index} tag={tag} />
                ))}
              </div>
            </div>
          </div>

          {item.project_website && (
            <div className="flex mt-8">
              <ButtonCustom
                title={dictionary.experiences.projectButton}
                onClick={() =>
                  item.project_website && window.open(item.project_website)
                }
              />
            </div>
          )}
        </div>
      );
    });
  };

  if (isError || !filteredExperienceData) return _renderError();
  if (isLoading) return _renderLoading();

  return (
    <div>
      {filteredExperienceData.map((item, i) => {
        if (!item) return null;

        return (
          <div key={i} className="flex flex-col w-full pt-4 pb-6 mb-8 lg:mb-12">
            <div
              className="
                flex flex-row justify-between w-full items-center
                md:justify-start md:gap-10
                lg:justify-start
              "
            >
              <h3 className="text-2xl border-b-2 font-bold max-w-sm lg:text-4xl lg:max-w-fit">
                {item.enterprise}
              </h3>

              {item.company_website && (
                <ButtonCustom
                  title={dictionary.experiences.companyButton}
                  onClick={() =>
                    item.company_website && window.open(item.company_website)
                  }
                />
              )}
            </div>

            <div className="mt-2 lg:mt-6">{_renderList(item.history)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ServerExperiences;
