import React from "react";
import Link from "next/link";
import { NextRouter } from "next/router";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useProduct } from "../context/product/productContext";
import { ActionType } from "@context/product/productActions";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { setPage, productSelector } from "../features/products/productSlice";

type PaginationProps = {
  numberOfPages: number;
  router?: NextRouter;
};

const Paginate = ({ numberOfPages }: PaginationProps) => {
  const { page } = useAppSelector(productSelector);
  const dispatch = useAppDispatch();
  const pages = Array.from({ length: numberOfPages }, (_, i) => i + 1);

  const prevPage = () => {
    let newPage = (page as number) - 1;
    if (newPage < 1) {
      newPage = numberOfPages;
    }
    dispatch(setPage(newPage));
  };

  const nextPage = () => {
    let newPage = (page as number) + 1;
    if (newPage > numberOfPages) {
      newPage = 1;
    }
    dispatch(setPage(newPage));
  };
  return (
    <div className="font-mono flex flex-row items-center gap-2 ">
      <button
        className="flex flex-row p-2 items-center text-gray-900 dark:text-gray-200 gap-2 bg-white dark:bg-gray-700 hover:bg-orange-400 rounded-l-md shadow-md"
        disabled={page === 1}
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
                pageNumber === page
                  ? "bg-white dark:bg-gray-700 text-orange-500 rounded-md"
                  : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-md"
              } py-2 px-4 gap-2  hover:bg-orange-400 shadow-md`}
              key={pageNumber}
              onClick={() => {
                dispatch(setPage(pageNumber));
              }}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button
        className="flex flex-row p-2 items-center text-gray-900 dark:text-gray-200 gap-2 bg-white dark:bg-gray-700 hover:bg-orange-400 rounded-r-md shadow-md"
        disabled={page === numberOfPages}
        onClick={nextPage}
      >
        <HiChevronDoubleRight fontSize={21} />
      </button>
    </div>
  );
};

export default Paginate;
