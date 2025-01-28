import React from "react";

const ProgressBar = () => {
  const progress = 40; // Progress in percentage

  return (
    <div className="container px-4 w-full text-center mb-4">
      <div className="w-full bg-[#3d3e42] rounded-lg h-[1.25rem] overflow-hidden">
        <div
          className="relative bg-[#a4c6ed] h-full transition-all duration-500 rounded-lg"
          style={{ width: `${progress}%` }}>
          <span className="absolute font-medium right-5 text-[#0d0c0f]">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
