import { useState } from "react";
import { IoFilter } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { useExperienceStore } from "@/hooks/stateHooks";
import { dictionariesProps } from "@/types/dictionaries";

export default function Filter({
  dictionary,
}: {
  dictionary: dictionariesProps["filter"];
}) {
  const [open, setOpen] = useState(false);
  const [openItems, setOpenItems] = useState<number[]>([]);
  const { filterData, filter, setFilter } = useExperienceStore(
    (state) => state,
  );

  const _handleOpen = () => setOpen(!open);

  const _handleItemClick = (index: number) => {
    setOpenItems((prevOpenItems) => {
      if (prevOpenItems.includes(index)) {
        return prevOpenItems.filter((item) => item !== index);
      } else {
        return [...prevOpenItems, index];
      }
    });
  };

  const _handleOptionChange = (
    topicValue: keyof typeof filter,
    value: string,
  ) => {
    const selectedForTopic = filter[topicValue] || [];

    let newFilter;
    if (selectedForTopic.includes(value)) {
      const updatedArray = selectedForTopic.filter(
        (option: string) => option !== value,
      );

      if (updatedArray.length > 0) {
        newFilter = {
          ...filter,
          [topicValue]: updatedArray,
        };
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [topicValue]: _, ...rest } = filter;
        newFilter = rest;
      }
    } else {
      newFilter = {
        ...filter,
        [topicValue]: [...selectedForTopic, value],
      };
    }

    setFilter(newFilter);
  };

  const _renderOptions = (item: string[], topic: string) => {
    return item.map((filterValue, i2) => (
      <div key={i2} className="flex flex-row px-4 my-4 items-center">
        <input
          value={filterValue}
          type="checkbox"
          className="mr-2 text-black size-5"
          onChange={() => _handleOptionChange(topic, filterValue)}
        />
        <p className="text-black text-lg">{filterValue}</p>
      </div>
    ));
  };

  const _renderList = () => {
    if (filterData.length === 0) return null;

    return (
      <div>
        {filterData.map((item, i) => (
          <div key={i}>
            <div
              className="px-4 py-2 cursor-pointer flex flex-row w-full justify-between hover:bg-customBlue hover:bg-opacity-20 shadow-lg"
              onClick={() => _handleItemClick(i)}
            >
              <p className="text-black text-xl">{item.value}</p>
              <IoIosArrowDown size={30} color="black" />
            </div>

            <div
              className={`flex flex-col overflow-y-auto transition duration-150 ease-in ${openItems.includes(i) ? "max-h-52 opacity-100" : "max-h-0 opacity-0"}`}
            >
              {_renderOptions(item.data, item.value)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div
        className="hidden md:flex flex-row border-2 rounded-xl px-4 py-2 gap-4 hover:cursor-pointer border-black dark:border-white hover:bg-bgWhite hover:text-black dark:hover:bg-bgWhite dark:hover:text-black"
        onClick={_handleOpen}
      >
        <IoFilter size={30} />
        <p className="text-xl">{dictionary.filter}</p>
      </div>

      <div className="md:hidden" onClick={_handleOpen}>
        <IoFilter size={40} />
      </div>

      <div
        className={`absolute mt-14 right-4 w-48 bg-bgWhite rounded-md z-10 transition duration-150 ease-in ${open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
      >
        {_renderList()}
      </div>
    </div>
  );
}
