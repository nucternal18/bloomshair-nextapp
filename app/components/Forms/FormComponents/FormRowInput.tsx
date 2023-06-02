import React from "react";

export type Ref = HTMLInputElement;

type InputProps = {
  title: string;
  errors: any;
  type: string;
  classes?: string;
  inputType: string;
  prependComponent?: React.ReactNode;
  appendComponent?: React.ReactNode;
};

const FormRowInput: React.FunctionComponent<
  InputProps &
    React.RefAttributes<HTMLInputElement> &
    React.HTMLProps<HTMLInputElement>
> = React.forwardRef<Ref, InputProps>(
  (
    {
      title,
      errors,
      type,
      classes,
      inputType,
      prependComponent,
      appendComponent,
      ...props
    }: InputProps,
    ref
  ) => (
    <div className="mb-4 w-full">
      <label htmlFor={type} className="block mb-2 text-base font-bold ">
        {title}
      </label>
      <div className="relative w-full flex items-center px-2 gap-2 leading-tight  text-gray-900 border border-gray-300 rounded appearance-none focus:outline-none focus:shadow-outline dark:bg-white">
        {prependComponent}
        <input
          className={`form-input w-full bg-transparent !ring-0 !border-transparent !focus:outline-none !focus:border-transparent !focus:ring-0 !focus:ring-offset-0 !outline-0 appearance-none !focus:ring-transparent`}
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
        {appendComponent}
      </div>
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
