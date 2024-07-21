"use client";
import SectionTitle from "@/components/Home/SectionTitle";
import ServerExperiences from "./ServerExperiences";
import Filter from "@/components/Experiences/Filter";
import Search from "@/components/Experiences/Search";

export default function Experiences() {
  const _renderList = ServerExperiences();

  return (
    <div
      id="experiences"
      className="flex flex-col h-full min-h-screen max-w-screen w-full pt-24 px-6"
    >
      <div className="flex flex-row items-start justify-between pr-12">
        <SectionTitle title="Experiences" />

        <div className="hidden md:flex flex-row gap-4">
          <Search />
          <Filter />
        </div>
      </div>

      <div className="flex md:hidden flex-row justify-end items-center mb-12 gap-4">
        <Search />
        <Filter />
      </div>

      <div className="flex flex-col gap-8 justify-center">{_renderList}</div>
    </div>
  );
}
