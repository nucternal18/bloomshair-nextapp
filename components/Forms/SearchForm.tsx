import FormRowInput from "./FormComponents/FormRowInput";
import FormRowSelect from "./FormComponents/FormRowSelect";
import { IForm } from "@lib/types";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { hairServiceSelector } from "features/hairServices/hairServiceSlice";

type Inputs = {
  category: string;
  sortBy: string;
};

interface SearchFormProps extends IForm<Inputs> {
  reset: () => void;
}

const SearchForm = ({ register, reset, errors }: SearchFormProps) => {
  const { categoryOptions, sortByOptions } =
    useAppSelector(hairServiceSelector);
  return (
    <form>
      <div className="relative p-2  max-w-screen-xl  bg-white font-mono dark:bg-gray-900 shadow-xl mt-5 mx-2 md:mx-auto md:p-4">
        <h3 className="capitalize text-xl font-semibold  text-gray-900 dark:text-gray-200 mb-4">
          search form
        </h3>
        <div className="grid grid-cols-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
            <FormRowSelect
              placeHolder="Select Category"
              label="Category"
              type="category"
              {...register("category")}
              errors={errors?.category}
              list={[...categoryOptions]}
            />
            <FormRowSelect
              placeHolder="Select an Option"
              label="Sort By"
              type="sortBy"
              {...register("sortBy")}
              errors={errors.sortBy}
              list={[...sortByOptions]}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
            <button
              className=" px-4 py-2 font-bold mt-4 text-white w-full bg-gray-500 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline  dark:text-gray-200 dark:hover:bg-gray-400"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                reset();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
