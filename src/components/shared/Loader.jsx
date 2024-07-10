import React from "react";

const Loader = () => {
  return (
    <div>
      <div className="fixed inset-0 bg-white bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200" />
          <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-orange-500 animate-spin" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
