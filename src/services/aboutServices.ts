import { getAboutData } from "@/Repositories/aboutRepository";
import { dataProps } from "@/types/api";
import { aboutProps, aboutReturnProps } from "@/types/about";
import to from "await-to-js";
import _ from "lodash";
import { Language } from "@/types/experiences";

class AboutServices {
  /**
   * Retrieves and processes about data for a given language.
   *
   * This function fetches about data, sorts languages based on fluency level,
   * and returns a structured object including descriptions and languages.
   *
   * @param {Language} lang - The language code for which to retrieve the data.
   * @return {Promise<aboutReturnProps | null>} A promise that resolves to the about data object
   * formatted with descriptions and sorted languages, or null if an error occurs.
   */
  async getAboutData(lang: Language): Promise<aboutReturnProps | null> {
    const [error, data] = await to(getAboutData());
    if (error) return null;

    const { language, descriptions } = (data as dataProps).data as aboutProps;

    const sortedLanguages = _.orderBy(language[lang], ["order"], ["desc"]);

    return {
      ...((data as dataProps).data as aboutReturnProps),
      description: descriptions.translations[lang],
      languages: sortedLanguages,
    };
  }
}

export default new AboutServices();
