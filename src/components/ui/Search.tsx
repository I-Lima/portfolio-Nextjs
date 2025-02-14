import { useExperienceStore } from "@/hooks/stateHooks";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface searchProps {
  placeholder: string;
}

export default function Search({ placeholder }: searchProps) {
  const { query, setQuery } = useExperienceStore((state) => state);
  const [isInputVisible, setIsInputVisible] = useState(false);

  const _handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
  };

  const toggleInputVisibility = () => {
    setIsInputVisible(!isInputVisible);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="relative">
      <div className="flex justify-end items-center">
        <button
          className="flex bg-customBlue w-10 h-10 items-center justify-center rounded-3xl z-10 lg:absolute lg:mr-1"
          type="button"
          onClick={toggleInputVisibility}
          aria-label="search button"
        >
          <FaSearch size={26} className="text-black" />
        </button>

        <input
          className={`h-12 bg-white rounded-2xl pl-4 text-black transition-all duration-500 ease-in-out absolute right-0 ${
            isInputVisible ? "opacity-100 w-64 md:w-96" : "opacity-0 w-0"
          } lg:relative lg:w-96 lg:opacity-100`}
          placeholder={placeholder}
          type="text"
          name="search"
          id="search"
          autoComplete="off"
          onChange={_handleInputChange}
          value={query}
          style={{ zIndex: isInputVisible ? "1 lg:0" : "-1 lg:0" }}
        />
      </div>
    </form>
  );
}
