import React from "react";

const Cross = ({ handleClick }) => {
  return (
    <svg
      onClick={handleClick}
      className="w-6 cursor-pointer text-white h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};
export default Cross;
