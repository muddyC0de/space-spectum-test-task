import clsx from "clsx";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  setValue: (value: string) => void;
  className?: string;
}

export const CreateTaskInput: React.FC<Props> = ({
  value,
  setValue,
  className,
}) => {
  return (
    <input
      className={clsx(
        "h-[40px] text-[17px] outline-none border border-[#37352f] rounded-md p-2 text-sm text-[#37352f] placeholder-gray-400 transition duration-200 ease-in-out focus:border-[#37352f] focus:ring-2 focus:ring-[#37352f] focus:ring-offset-2 hover:border-[#37352f] hover:bg-gray-100",
        className
      )}
      placeholder="Add a task..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type="text"
    />
  );
};
