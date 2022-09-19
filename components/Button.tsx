import React, { forwardRef, HTMLProps, ReactNode } from "react";

export type Ref = HTMLButtonElement;
interface Colors {
  primary: string;
  success: string;
  danger: string;
  dark: string;
  warning: string;
  indigo: string;
  yellow: string;
}

type ButtonProps = {
  disabled?: boolean;
  className?: string;
  color: string;
  type: "submit" | "button";
  children?: ReactNode;
  props?: HTMLProps<HTMLButtonElement>;
  buttonName?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button = forwardRef<Ref, ButtonProps>(
  (
    {
      children,
      disabled,
      className,
      type,
      buttonName,
      color,
      ...props
    }: ButtonProps,
    ref
  ) => (
    <button
      ref={ref}
      {...props}
      disabled={disabled}
      aria-label={`${buttonName}-button`}
      type={type}
      className={`${colors[color as keyof Colors]} ${className} ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      }  text-white focus:outline-none shadow rounded px-4 py-2 font-medium transition flex items-center justify-center ease-in duration-200`}
    >
      {children}
    </button>
  )
);

const colors: Colors = {
  primary: `border-blue-700 border-2 text-blue-700 active:bg-blue-700 active:text-white hover:bg-blue-700 hover:text-white`,
  success: `border-green-700 border-2 text-green-700 active:bg-green-700 active:text-white`,
  danger: `border-red-600 border text-red-600 active:bg-red-600 active:text-white`,
  dark: ` border dark:border-none text-gray-200 bg-black hover:bg-yellow-500 hover:text-white`,
  warning: `border-red-500 border text-red-500 active:bg-red-500 active:text-white`,
  indigo: `border-indigo-900 border-2 text-indigo-900 active:bg-indigo-900 active:text-white`,
  yellow: `border-yellow-500 border text-yellow-500 active:bg-yellow-500 active:text-white text-center hover:bg-yellow-500 hover:text-white`,
};

Button.displayName = "Button";

export default Button;
