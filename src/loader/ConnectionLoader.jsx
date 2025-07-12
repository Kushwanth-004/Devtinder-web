import React from "react";

const ConnectionLoader = () => {
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-8 px-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="w-80 h-[420px] bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 rounded-3xl shadow-md border border-pink-200 animate-pulse"
          >
            <div className="w-full h-60 bg-rose-200 rounded-t-3xl" />
            <div className="p-5">
              <div className="w-3/4 h-5 bg-rose-300 rounded mb-3" />
              <div className="w-full h-3 bg-rose-200 rounded mb-2" />
              <div className="w-1/2 h-3 bg-rose-300 rounded mb-4" />
              <div className="w-2/3 h-3 bg-rose-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectionLoader;
