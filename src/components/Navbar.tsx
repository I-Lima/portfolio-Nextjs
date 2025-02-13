"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SwitchDarkMode from "./SwitchDarkMode";
import { useDictionary } from "@/context/DictionaryContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { dictionary } = useDictionary();

  if (!dictionary) return null;

  const _toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="px-4 py-4 bg-bgWhite dark:bg-bgBlack z-50 fixed mx-auto flex items-center justify-between w-full lg:py-2 lg:px-8">
      <div>
        <a href="/">
          <Image
            src="/images/logo.svg"
            alt="website logo"
            width={100}
            height={80}
          />
        </a>
      </div>

      <div className="flex items-center gap-4 md:gap-2">
        <div>
          <SwitchDarkMode />
        </div>

        <div className="hidden md:flex dark:text-customGray text-black text-xl">
          <Link
            href="/#about"
            className="ml-2 p-4 hover:bg-customBlue/[.80] hover:text-white transition duration-300 ease-in-out"
            passHref
          >
            {dictionary.about.section}
          </Link>
          <Link
            href="/#experiences"
            className="ml-2 p-4 hover:bg-customBlue/[.80] hover:text-white transition duration-300 ease-in-out"
          >
            {dictionary.experiences.section}
          </Link>
          <Link
            href="/#projects"
            className=" ml-2 p-4 hover:bg-customBlue/[.80] hover:text-white transition duration-300 ease-in-out"
          >
            {dictionary.projects.section}
          </Link>
          <Link
            href="/#contact"
            className="ml-2 p-4 hover:bg-customBlue/[.80] hover:text-white transition duration-300 ease-in-out"
          >
            {dictionary.contact.section}
          </Link>
        </div>

        <div className="md:hidden">
          <button
            className="text-black dark:text-white"
            onClick={_toggleMenu}
            aria-label="Open Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`absolute top-16 right-4 bg-bgWhite rounded-md shadow-lg py-1 z-50 w-48 transition duration-150 ease-in lg:hidden ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
      >
        <Link
          href="/#about"
          className="block px-4 py-2 text-black border-b-2 border-customGray"
          passHref
          onClick={_toggleMenu}
        >
          {dictionary.about.section}
        </Link>
        <Link
          href="/#experiences"
          className="block px-4 py-2 text-black border-b-2 border-customGray"
          onClick={_toggleMenu}
        >
          {dictionary.experiences.section}
        </Link>
        <Link
          href="/#projects"
          className="block px-4 py-2 text-black border-b-2 border-customGray"
          onClick={_toggleMenu}
        >
          {dictionary.projects.section}
        </Link>
        <Link
          href="/#projects"
          className="block px-4 py-2 text-black"
          onClick={_toggleMenu}
        >
          {dictionary.contact.section}
        </Link>
      </div>
    </nav>
  );
}
