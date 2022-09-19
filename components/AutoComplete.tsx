import { MutableRefObject, Dispatch, SetStateAction } from "react";

interface IAutoComplete {
  isVisible: any;
  suggestions: string[];
  handleSuggestionClick: (suggestion: string) => void;
}

function AutoComplete({
  isVisible,
  suggestions,
  handleSuggestionClick,
}: IAutoComplete): JSX.Element {
  return (
    <div
      className={`${
        isVisible
          ? "block absolute bg-white rounded-md mt-1 sm:w-full max-w-screen-lg z-50"
          : "hidden"
      }`}
    >
      <ul>
        {suggestions.map((product, index) => (
          <li
            className="border border-none hover:bg-black hover:text-white dark:text-gray-900 cursor-pointer p-2"
            key={index}
            onClick={() => handleSuggestionClick(product)}
          >
            {product}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AutoComplete;
