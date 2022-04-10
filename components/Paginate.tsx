import React from "react";
import Link from "next/link";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { ActionType, useProduct } from "../context/product/productContext";

const Paginate = ({ numberOfPages }) => {
  const { state, dispatch } = useProduct();
  const pages = Array.from({ length: numberOfPages }, (_, i) => i + 1);
  const changePage = (page: number) => {
    dispatch({
      type: ActionType.CHANGE_PAGE,
      payload: { page },
    });
  };
  const prevPage = () => {
    console.log("prev page");
    let newPage = state?.page - 1;
    if (newPage < 1) {
      newPage = numberOfPages;
    }
    changePage(newPage);
  };
  const nextPage = () => {
    console.log("next page");
    let newPage = state?.page + 1;
    if (newPage > numberOfPages) {
      newPage = 1;
    }
    changePage(newPage);
  };
  return (
    <div className="font-mono flex flex-row items-center gap-2 ">
      <button
        className="flex flex-row p-2 items-center text-gray-900 dark:text-gray-200 gap-2 bg-white dark:bg-gray-700 hover:bg-orange-400 rounded-l-md shadow-md"
        onClick={prevPage}
      >
        <HiChevronDoubleLeft fontSize={21} />
      </button>
      <div className="flex flex-row items-center gap-1  rounded-md">
        {pages?.map((pageNumber) => {
          return (
            <button
              type="button"
              className={`${
                pageNumber === state.page
                  ? "bg-white dark:bg-gray-700 text-orange-500 rounded-md"
                  : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-md"
              } py-2 px-4 gap-2  hover:bg-orange-400 shadow-md`}
              key={pageNumber}
              onClick={() => changePage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button
        className="flex flex-row p-2 items-center text-gray-900 dark:text-gray-200 gap-2 bg-white dark:bg-gray-700 hover:bg-orange-400 rounded-r-md shadow-md"
        onClick={nextPage}
      >
        <HiChevronDoubleRight fontSize={21} />
      </button>
    </div>
  );
};

export default Paginate;
