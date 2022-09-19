import React from "react";

type Color = {
  success: string;
  danger: string;
  default: string;
};
const ErrorMessage = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: keyof Color;
}) => {
  const color: Color = {
    success: "text-green-500 text-sm",
    danger: "text-red-500 text-sm",
    default: "text-yellow-500 text-sm",
  };
  return (
    <div className={`${color[variant]} py-1 font-medium italic text-center`}>
      {children}
    </div>
  );
};

export default ErrorMessage;
