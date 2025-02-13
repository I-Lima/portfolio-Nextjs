"use client";
import { useDictionary } from "@/context/DictionaryContext";
import { useRouter } from "next/navigation";
import { MdArrowForward } from "react-icons/md";

interface ButtonMoreProps {
  onClick?: () => void;
  text: string;
  projects?: boolean;
}

const ButtonMore: React.FC<ButtonMoreProps> = ({ onClick, text, projects }) => {
  const route = useRouter();
  const { lang } = useDictionary();

  function handleClick() {
    route.push(`/${lang}/experiences`);
  }

  return (
    <div
      className="flex flex-row gap-2 px-2 py-1 border-2 border-dashed rounded-xl transition duration-500 ease-in-out hover:cursor-pointer hover:bg-bgBlack hover:text-white dark:hover:bg-bgWhite dark:hover:text-black"
      onClick={projects ? handleClick : onClick}
    >
      <p className="text-2xl font-bold">{text}</p>
      <MdArrowForward size={35} />
    </div>
  );
};

export default ButtonMore;
