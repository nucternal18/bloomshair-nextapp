import React from "react";
import { FieldErrors } from "react-hook-form";

export type Ref = HTMLInputElement;

type FormInputProps = {
  title?: string;
  type: string;
  label: string;
  placeHolder?: string;
  classes?: string;
  errors?: FieldErrors | undefined;
};

const FormCheckbox: React.FunctionComponent<
  FormInputProps & React.RefAttributes<HTMLInputElement>
> = React.forwardRef<Ref, FormInputProps>(
  ({ label, title, type, errors, classes, ...props }: FormInputProps, ref) => (
    <div className={`flex w-full items-center space-x-4 ${classes}`}>
      <input
        className="form-checkbox h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-transparent"
        id={`${title}`}
        ref={ref}
        name={`${type}`}
        type="checkbox"
        aria-invalid="true"
        {...props}
      />
      <label
        htmlFor={title}
        className="my-2 text-sm font-semibold text-gray-900"
      >
        {label} <span className="text-red-500">*</span>
      </label>
    </div>
  )
);

FormCheckbox.displayName = "FormCheckbox";

export default FormCheckbox;
