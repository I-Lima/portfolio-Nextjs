import Tag from "@/components/Tag";
import ProjectsServices from "@/services/projectsServices";
import { ProjectData } from "@/types/repository";
import Image from "next/image";
import { useEffect, useState } from "react";

const ServerListProjects = () => {
  const [dataProject, setDataProject] = useState<ProjectData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const projectsServices = new ProjectsServices();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await projectsServices.getProjectsToPreview();
        if (data) setDataProject(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const _renderLoading = () => {
    return (
      <div className="flex flex-row w-screen gap-20">
        <div className="animate-pulse flex flex-col mt-4 transition-transform w-2/3 justify-start">
          <div className="bg-customGray h-8 w-1/4" />
          <div className="bg-customGray h-32 w-/4 mt-4" />

          <div className="mt-4 flex flex-row gap-4">
            <div className="bg-customGray h-8 w-24 rounded" />
            <div className="bg-customGray h-8 w-24 rounded" />
            <div className="bg-customGray h-8 w-24 rounded" />
          </div>
        </div>

        <div className="animate-pulse flex flex-col mt-4 transition-transform w-2/3 justify-start">
          <div className="bg-customGray h-8 w-1/4" />
          <div className="bg-customGray h-32 w-/4 mt-4" />

          <div className="mt-4 flex flex-row gap-4">
            <div className="bg-customGray h-8 w-24 rounded" />
            <div className="bg-customGray h-8 w-24 rounded" />
            <div className="bg-customGray h-8 w-24 rounded" />
          </div>
        </div>
      </div>
    );
  };

  const _renderError = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <Image src="/gifs/error.gif" alt="error gif" width={450} height={450} />

        <p>An error has occurred. Try later</p>
      </div>
    );
  };

  return () => {
    if (isLoading) return _renderLoading();

    if (isError) return _renderError();

    return dataProject.map((item, i) => {
      const tagArray = item.topics;

      return (
        <div
          key={i}
          className="
            flex flex-col max-w-sm flex-wrap
            lg:max-w-lg
          "
        >
          <h3 className="text-xl border-b-2 md:text-2xl">{item.name}</h3>

          <div className="mt-4 border-white border-b-2 rounded-lg pb-3 justify-center items-center lg:px-2">
            <p className="text-lg text-justify">{item.description}</p>

            <div className="flex flex-wrap mt-4 gap-2 lg:gap-4">
              {tagArray.map((item, i2) => {
                return <Tag key={i2} tag={item} />;
              })}
            </div>
          </div>
        </div>
      );
    });
  };
};

export default ServerListProjects;
