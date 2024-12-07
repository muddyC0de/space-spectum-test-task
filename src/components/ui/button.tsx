import clsx from "clsx";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button: React.FC<Props> = ({ className, children, ...props }) => {
  return (
    <button
      className={clsx(
        "bg-[#37352f] h-[40px] text-white rounded-md p-2 text-sm font-medium transition duration-200 ease-in-out hover:bg-[#2c2a26] focus:outline-none focus:ring-2 focus:ring-[#37352f] focus:ring-offset-2 active:scale-95 shadow-md hover:shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
