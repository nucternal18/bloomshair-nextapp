import { UserCategory } from "@prisma/client";
import React from "react";
import { FieldError } from "react-hook-form";
import { FaCaretDown } from "react-icons/fa";

export type Ref = HTMLSelectElement;

type SelectProps = {
  placeHolder: string;
  label: string;
  type: string;
  list: any[];
  errors: FieldError | undefined;
};

const FormRowSelect: React.FunctionComponent<
  SelectProps & React.RefAttributes<HTMLSelectElement>
> = React.forwardRef<Ref, SelectProps>(
  ({ list, errors, placeHolder, label, type, ...props }: SelectProps, ref) => (
    <div className="flex flex-col ">
      <label htmlFor="jobType" className="block mb-2 text-base font-bold ">
        {label}
      </label>
      <select
        className="form-select px-3 py-2 leading-tight text-gray-900 bg-white shadow appearance-none focus:ring-0 focus:outline-none  dark:bg-white"
        id={`${type}`}
        ref={ref}
        placeholder={`${placeHolder}`}
        aria-label={`${type}-input`}
        aria-errormessage={`${type}-error`}
        name={`${type}`}
        aria-invalid="true"
        {...props}
      >
        {list?.map((itemValue, index) => {
          return (
            <option key={`${index} + ${itemValue}`} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
      {errors && (
        <span
          id={`${type}-error`}
          className="text-gray-800 dark:text-yellow-500"
        >
          {errors.message}
        </span>
      )}
    </div>
  )
);

FormRowSelect.displayName = "FormRowSelect";

export default FormRowSelect;
