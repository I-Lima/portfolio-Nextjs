import Banner from "@/components/Home/Banner/index";
import About from "@/components/Home/About";
import Experiences from "@/components/Home/Experiences";
import Projects from "@/components/Home/Projects";
import { FaArrowDown } from "react-icons/fa";
import Contact from "@/components/Home/Contact";
import { Locale } from "../../../i18n-config";
import { getDictionary } from "../../getDictionary";
import { dictionariesProps } from "@/types/dictionaries";
import LanguageSwitch from "@/components/ui/LanguageSwitch";

export default async function Home({ params }: { params: { lang: Locale } }) {
  const { lang } = params;
  const dictionary: dictionariesProps = await getDictionary(lang);

  return (
    <main className="flex min-h-screen max-w-screen flex-col items-center justify-center px-6">
      <div className="flex flex-col h-screen max-w-screen pt-24">
        <div className="flex w-screen justify-end mr-20 mt-6">
          <LanguageSwitch lang={lang} dictionary={dictionary["languageSwitch"]} />
        </div>

        <div className="flex flex-col items-center justify-center h-full">
          <Banner />

          <div className="flex flex-col items-center mt-20">
            <p className="text-3xl mb-5 pb-1" style={{ borderBottomWidth: 1 }}>
              {dictionary["home"].moreInfo}
            </p>

            <div className="flex flex-col items-center motion-safe:animate-bounce">
              <div className="h-8 border-2 border-dashed w-1"></div>
              <FaArrowDown className="text-black dark:text-white text-3xl" />
            </div>
          </div>
        </div>
      </div>

      <About />

      <Experiences />

      <Projects />

      <Contact />
    </main>
  );
}
