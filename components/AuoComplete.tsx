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
          ? "block absolute border-b bg-white border-gray-900 border-opacity-50 sm:w-full max-w-screen-lg z-50"
          : "hidden"
      }`}
    >
      <ul>
        {suggestions.map((country, index) => (
          <li
            className="border border-gray-900 border-opacity-50 hover:bg-black hover:text-white cursor-pointer p-1"
            key={index}
            onClick={() => handleSuggestionClick(country)}
          >
            {country}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AutoComplete;
