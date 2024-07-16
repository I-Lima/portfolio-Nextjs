"use client";
import Link from "next/link";
import { MdArrowForward } from "react-icons/md";

interface ButtonMoreProps {
  onClick?: () => void;
  href?: string;
}

const ButtonMore: React.FC<ButtonMoreProps> = ({ onClick, href }) => {
  return (
    <>
      {onClick && (
        <div
          className="flex flex-row gap-2 px-4 py-2 border-2 border-dashed rounded-xl transition duration-500 ease-in-out hover:cursor-pointer hover:bg-bgBlack hover:text-white dark:hover:bg-bgWhite dark:hover:text-black"
          onClick={onClick}
        >
          <p className="text-2xl font-bold">More</p>
          <MdArrowForward size={35} />
        </div>
      )}

      {href && (
        <div className="flex flex-row gap-2 px-4 py-2 border-2 border-dashed rounded-xl transition duration-500 ease-in-out hover:cursor-pointer hover:bg-bgBlack hover:text-white dark:hover:bg-bgWhite dark:hover:text-black">
          <Link href={href} className="flex">
            <p className="text-2xl font-bold">More</p>
            <MdArrowForward size={35} />
          </Link>
        </div>
      )}
    </>
  );
};

export default ButtonMore;
