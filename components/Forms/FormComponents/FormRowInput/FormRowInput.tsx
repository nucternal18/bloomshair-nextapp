import { type } from "os";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { IFormData } from "../../../../lib/types";

export type Ref = HTMLInputElement;

type InputProps = {
  title: string;
  errors: any;
  type: string;
  inputType: string;
};

const FormRowInput: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > &
    InputProps
> = React.forwardRef<Ref, InputProps>(
  ({ title, errors, type, inputType, ...props }: InputProps, ref) => (
    <div className="mb-4 w-full">
      <label
        htmlFor="position"
        className="block mb-2 text-base font-bold text-gray-900 dark:text-gray-200"
      >
        {title}
      </label>
      <input
        className="w-full px-3 py-2 leading-tight text-gray-900 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-white"
        id={`${type}`}
        ref={ref}
        type={`${inputType}`}
        placeholder={`${title}`}
        aria-label={`${type}-input`}
        aria-errormessage={`${type}-error`}
        name={`${type}`}
        aria-invalid="true"
        {...props}
      />
      {errors && (
        <span
          id={`${type}-error`}
          className="text-gray-800 dark:text-yellow-500"
        >
          {errors?.message}
        </span>
      )}
    </div>
  )
);

FormRowInput.displayName = "FormRowInput";

export default FormRowInput;
