/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Button from "./Button";
import useOutsideClick from "../hooks/useOutsideClick";
import _ from "lodash";
import AutoComplete from "./AuoComplete";
import { NEXT_URL } from "../config";

const SearchBox = () => {
  const router = useRouter();
  const { ref: documentRef, isVisible, setIsVisible } = useOutsideClick();
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [keyword, setKeyword] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    ref.current = _.debounce(processRequest, 300);
  }, []);

  async function processRequest(searchValue) {
    const res = await fetch(`${NEXT_URL}/api/products/allProducts`);
    const data = await res.json();
    const productNames = data.map((product) => product.name);
    const result = productNames.filter((product) =>
      product.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSuggestions(result);
    if (result.length > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  function handleSearch(event) {
    event.preventDefault();
    const { value } = event.target;
    setKeyword(value);
    ref.current(value);
  }

  function handleSuggestionClick(value) {
    setSelectedProduct(value);
    setIsVisible(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsVisible(false);
    router.push(`/products/search?keyword=${selectedProduct}`);
    setKeyword("");
  };
  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-screen-lg">
      <div className="flex flex-col w-full">
        <input
          type="text"
          name="q"
          value={keyword}
          onChange={handleSearch}
          autoComplete="off"
          placeholder="Search Products..."
          className="w-full p-2 border-2 border-collapse border-gray-800 border-opacity-70 rounded-l-md focus:ring-transparent focus:outline-none focus:border-gray-900"
        />
        <div ref={documentRef}>
          {isVisible && (
            <AutoComplete
              isVisible={isVisible}
              suggestions={suggestions}
              handleSuggestionClick={handleSuggestionClick}
            />
          )}
        </div>
      </div>
      <button
        type="submit"
        className="border-gray-800 border rounded-r-md  bg-gray-800  hover:bg-gray-900 text-gray-200 hover:text-gray-100  focus:outline-none shadow  px-4 py-2 font-medium transition flex items-center justify-center ease-in duration-200"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
