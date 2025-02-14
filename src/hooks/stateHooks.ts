import { create } from "zustand";
import { ExperienceState } from "@/types/state";
import {
  experienceHistoryReturnProps,
  experienceReturnProps,
} from "@/types/experiences";
import {
  filterItem,
  filterResultsProps,
  selectedOptionsProps,
  setFilterDataProps,
} from "@/types/filter";

export const useExperienceStore = create<ExperienceState>((set, get) => ({
  experienceData: [] as experienceReturnProps[],
  filteredExperienceData: [] as experienceReturnProps[],
  filterData: [] as filterItem[],
  filter: {} as selectedOptionsProps,
  query: "",
  setExperienceData: (data, dictionary) =>
    setFilterData({ data, set, dictionary }),
  setFilterData: (data, dictionary) => setFilterData({ data, set, dictionary }),
  setFilter: (filter) => {
    set(() => ({ filter }));
    filterResults({ set, get });
  },
  setQuery: (query) => {
    set(() => ({ query }));
    filterResults({ set, get });
  },
}));

/**
 * Function that sets filter data based on the provided experience data.
 *
 * @param {experienceProps[]} data - The array of experience data to extract tags from.
 * @param {function} set - The function to update the filter and experience data.
 * @return {void} Updates the filter and experience data using the provided set function.
 */
const setFilterData = ({ data, set, dictionary }: setFilterDataProps): void => {
  const tagSet = new Set<string>();
  const typeSet = new Set<string>();

  data.forEach((experience: experienceReturnProps) => {
    experience.history.forEach((history) => {
      typeSet.add(history.type);
      history.tags.forEach((tag) => {
        tagSet.add(tag);
      });
    });
  });

  const newFilterData: filterItem[] = [
    {
      value: "skill",
      data: Array.from(tagSet),
    },
    {
      value: dictionary.type || "type",
      data: Array.from(typeSet),
    },
  ];

  return set(() => ({
    filterData: newFilterData,
    experienceData: data,
    filteredExperienceData: data,
  }));
};

/**
 * Filters the experience data based on the query and filter state.
 *
 * @param {Object} param - An object containing the set function.
 * @param {function} param.set - The function to update the state.
 * @return {void} Updates the filteredExperienceData in the state.
 */
const filterResults = ({ set, get }: filterResultsProps): void => {
  const { experienceData, query, filter } = get();
  const lowerCaseQuery = query.toLowerCase();

  const filteredResults = experienceData
    .filter((exp: experienceReturnProps) => {
      if (query.trim() === "") return true;

      const matchesEnterprise = exp.enterprise
        .toLowerCase()
        .includes(lowerCaseQuery);
      const matchesHistory = exp.history.some(
        (hist) =>
          hist.role.toLowerCase().includes(lowerCaseQuery) ||
          hist.description.toLowerCase().includes(lowerCaseQuery),
      );

      return matchesEnterprise || matchesHistory;
    })
    .map((exp: experienceReturnProps) => {
      if (!filter) return exp;

      const filteredHistory = exp.history.filter(
        (historyItem: experienceHistoryReturnProps) => {
          const hasSkill = filter.skill
            ? filter.skill.some((skill: string) =>
                historyItem.tags.includes(skill),
              )
            : true;
          const hasType = filter.type
            ? filter.type.includes(historyItem.type)
            : true;

          return hasSkill && hasType;
        },
      );

      if (filteredHistory.length > 0) {
        return { ...exp, history: filteredHistory };
      } else {
        return null;
      }
    })
    .filter((result): result is experienceReturnProps => result !== null);

  set({ filteredExperienceData: filteredResults });
};
