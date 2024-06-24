import { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { filterItem } from "@/app/experiences/page";
import { useExperienceStore } from "@/hooks/stateHooks";
import { FilterProps } from "@/types/filter";

export default function Filter({ data }: FilterProps) {
  const [dataFilter, setDataFilter] = useState<filterItem[]>([]);
  const [open, setOpen] = useState(false);
  const [openItems, setOpenItems] = useState<number[]>([]);
  const setFilterData = useExperienceStore((state) => state.setFilter);
  const filter = useExperienceStore((state) => state.filter);

  useEffect(() => {
    setDataFilter(data);
  }, [data]);

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

    setFilterData(newFilter);
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
    return dataFilter.map((item, i) => (
      <div key={i}>
        <div
          className="px-4 py-2 cursor-pointer flex flex-row w-full justify-between hover:bg-customBlue hover:bg-opacity-20 shadow-lg"
          onClick={() => _handleItemClick(i)}
        >
          <p className="text-black text-xl">{item.value}</p>
          <IoIosArrowDown size={30} color="black" />
        </div>
        {openItems.includes(i) && (
          <div className="flex flex-col max-h-52 overflow-y-auto">
            {_renderOptions(item.data, item.value)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex flex-row border-2 rounded-xl px-4 py-2 gap-4"
        onClick={_handleOpen}
      >
        <IoFilter size={30} />
        <p className="text-xl">Filter</p>
      </div>

      {open && (
        <div className="absolute mt-14 w-48 bg-white rounded-md z-10">
          {_renderList()}
        </div>
      )}
    </div>
  );
}