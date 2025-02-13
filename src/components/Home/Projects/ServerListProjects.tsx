import Tag from "@/components/ui/Tag";
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
    return Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className="animate-pulse flex flex-col mt-4 transition-transform w-2/3 justify-start bg-customGray/70 p-6 rounded-lg"
      >
        <div className="bg-customGray h-8 w-1/4" />
        <div className="bg-customGray h-32 w-/4 mt-4" />

        <div className="mt-4 flex flex-row gap-4">
          {[...Array(3)].map((_, j) => (
            <div key={j} className="bg-customGray h-8 w-24 rounded" />
          ))}
        </div>
      </div>
    ));
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
        <button
          key={i}
          className="
              flex flex-col min-w-sm max-w-sm flex-wrap border-[1px] rounded-lg p-4 border-black/50 dark:border-white/50 shadow-lg dark:shadow-customGray/10 transition-transform duration-100 hover:scale-105
              lg:max-w-lg lg:m-4 lg:min-h-64 lg:justify-center
            "
          onClick={() => window.open(item.html_url)}
        >
          <h3 className="flex flex-row text-xl border-b-2 md:text-2xl">
            {item.name}
          </h3>

          <div
            className="
                flex flex-col mt-4 justify-center items-center
                md:flex-1 md:justify-around
                lg:px-2
              "
          >
            <p className="text-lg text-justify px-4">{item.description}</p>

            <div className="flex flex-wrap mt-4 gap-2 lg:gap-4">
              {tagArray.map((item, i2) => {
                return <Tag key={i2} tag={item} />;
              })}
            </div>
          </div>
        </button>
      );
    });
  };
};

export default ServerListProjects;
