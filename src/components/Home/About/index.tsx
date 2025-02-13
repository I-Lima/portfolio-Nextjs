"use client";
import React from "react";
import SectionTitle from "../../ui/SectionTitle";
import ServerListAbout from "./ServerListAbout";

export default function About() {
  const _renderComponent = ServerListAbout();

  return (
    <div id="about" className="flex flex-col max-w-screen w-full py-8 mb-20">
      <div className="flex flex-col items-start">
        <SectionTitle title="About" />
      </div>

      <div className="md:px-8 lg:px-0">{_renderComponent}</div>
    </div>
  );
}
