/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa";
import useOutsideClick from "../hooks/useOutsideClick";
import AutoComplete from "./AutoComplete";
import { NEXT_URL } from "../config";

import { ProductProps } from "../lib/types";

const SearchBox = ({
  register,
  suggestions,
  documentRef,
  isVisible,
  setIsVisible,
}) => {
  const router = useRouter();
  const productNames = suggestions.map((product: ProductProps) => product.name);

  function handleSuggestionClick(value) {
    const url = `${NEXT_URL}/products?keyword=${value}`;
    router.replace(url);
    setIsVisible(false);
  }

  return (
    <div className="flex w-full max-w-screen-lg flex-col gap-1 shadow-2xl rounded-2xl">
      <form className="flex w-full max-w-screen-lg">
        <div className="flex justify-start items-center w-full px-4 py-1 rounded-2xl bg-white border-none  focus:outline-none">
          <div className="flex flex-col w-full">
            <div>
              <input
                type="text"
                name="q"
                autoComplete="off"
                placeholder="Search Products..."
                className="w-full p-2  bg-white focus:outline-none border-none focus:shadow-none focus:ring-0"
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
