"use client";

import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import useOutsideClick from "../../hooks/useOutsideClick";
import AutoComplete from "./AutoComplete";
import { NEXT_URL } from "../../config";

import { ProductProps } from "../../lib/types";
import { UseFormRegister } from "react-hook-form";

interface IFormData {
  search: string;
}

interface ISearchBoxProps {
  register: UseFormRegister<IFormData>;
  suggestions: ProductProps[];
  documentRef: MutableRefObject<HTMLDivElement | null>;
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

const SearchBox = ({
  register,
  suggestions,
  documentRef,
  isVisible,
  setIsVisible,
}: ISearchBoxProps) => {
  const router = useRouter();
  const productNames = suggestions.map((product: ProductProps) => product.name);

  function handleSuggestionClick(value: string) {
    const url = `${NEXT_URL}/products?keyword=${value}`;
    router.replace(url);
    setIsVisible(false);
  }

  return (
    <div className="flex w-full max-w-screen-lg flex-col gap-1 shadow-2xl rounded-2xl">
      <form className="flex w-full max-w-screen-lg">
        <div className="flex justify-start items-center w-full px-4 py-1 rounded-md bg-white border-none  focus:outline-none">
          <div className="flex flex-col w-full">
            <div>
              <input
                type="search"
                autoComplete="off"
                placeholder="Search Products..."
                className="w-full p-2  bg-white focus:outline-none border-none focus:shadow-none dark:text-gray-900 focus:ring-0"
                {...register("search")}
              />
            </div>
          </div>
          <FaSearch fontSize={21} className="ml-2 text-gray-900" />
        </div>
      </form>
      <div ref={documentRef}>
        {isVisible && (
          <AutoComplete
            isVisible={isVisible}
            suggestions={productNames}
            handleSuggestionClick={handleSuggestionClick}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBox;
