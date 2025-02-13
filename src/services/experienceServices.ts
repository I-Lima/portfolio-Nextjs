import { getExperienceData } from "@/Repositories/experienceRepository";
import { dataProps } from "@/types/api";
import { experiencesProps } from "@/types/dictionaries";
import {
  experienceHistoryReturnProps,
  experienceProps,
  experienceReturnProps,
  Language,
} from "@/types/experiences";
import { parseDateString } from "@/utils/general";
import to from "await-to-js";
import _ from "lodash";

type Props = {
  lang: Language;
  dictionary: experiencesProps;
};

class ExperienceServices {
  /**
   * Retrieves a preview of experience data by fetching the experience data from the server,
   * sorting it, and formatting it into a specific structure.
   *
   * @return {Promise<experienceReturnProps[] | null>} An array of experience data objects with formatted history.
   * If there is an error or no data is returned from the server, null is returned.
   */
  async getPreviewExperiencesData(
    props: Props,
  ): Promise<experienceReturnProps[] | null> {
    const [error, data] = await to(getExperienceData());
    if (error || !data) return null;
    const { lang, dictionary } = props;

    const sortedDocuments: experienceProps[] = _.orderBy(
      (data as dataProps).data,
      "output",
    );

    const newSortedDocuments = sortedDocuments.map((document) => {
      const historyArray = Object.values(document.history);
      const orderedHistory = _.orderBy(
        historyArray,
        (item) => parseDateString(item.output),
        ["desc"],
      );

      const updatedHistory = orderedHistory.map((item) => {
        return {
          ...item,
          output: item.output || dictionary.currently,
          role: item.translations[lang].role || item.translations["en"].role,
          description:
            item.translations[lang].description ||
            item.translations["en"].description,
        };
      });

      return { ...document, history: updatedHistory };
    });

    const firstHistory = newSortedDocuments[0].history;
    if (firstHistory.length === 2) return [newSortedDocuments[0]];

    const historyReturn: experienceHistoryReturnProps[] = [];
    if (firstHistory.length >= 2) {
      historyReturn.push(firstHistory[0]);
      historyReturn.push(firstHistory[1]);

      return [
        { ...newSortedDocuments[0], history: historyReturn },
      ] as experienceReturnProps[];
    }

    const dataReturn: experienceReturnProps[] = [
      {
        ...newSortedDocuments[0],
        history: [firstHistory[0]],
      },
    ];

    if (newSortedDocuments[1]) {
      dataReturn.push({
        ...newSortedDocuments[1],
        history: [newSortedDocuments[1].history[0]],
      });
    }

    return dataReturn;
  }

  /**
   * Retrieves all experience data from the server, sorts it, and formats it.
   *
   * @return {Promise<experienceProps[] | null>} An array of experience data objects with formatted history.
   * If there is an error or no data is returned from the server, null is returned.
   */
  async getAllExperienceData({ lang, dictionary }: Props) {
    const [error, data] = await to(getExperienceData());
    if (error) return null;

    const sortedDocuments: experienceProps[] = _.orderBy(
      (data as dataProps).data,
      "output",
    );

    const newSortedDocuments = sortedDocuments.map((document) => {
      const historyArray = Object.values(document.history);
      const orderedHistory = _.orderBy(
        historyArray,
        (item) => parseDateString(item.output),
        ["desc"],
      );

      const updatedHistory = orderedHistory.map((item) => {
        return {
          ...item,
          output: item.output || dictionary.currently,
          role: item.translations[lang].role || item.translations["en"].role,
          description:
            item.translations[lang].description ||
            item.translations["en"].description,
        };
      });

      return { ...document, history: updatedHistory };
    });

    return newSortedDocuments as experienceReturnProps[];
  }
}

export default new ExperienceServices();
