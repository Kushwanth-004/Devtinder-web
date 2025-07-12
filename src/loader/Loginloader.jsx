import React from "react";

const Loginloader = () => {
  return (
    <div>
      <div className="relative w-[330px] h-[500px] rounded-2xl bg-white border shadow-lg overflow-hidden flex flex-col justify-between shimmer-card">
        {/* Profile Image Placeholder */}
        <div className="w-full h-full bg-shimmer object-cover" />

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 w-full h-[120px] bg-gradient-to-t from-black/60 to-transparent"></div>

        {/* Name + Age Placeholder */}
        <div className="absolute bottom-16 left-4">
          <div className="h-5 w-36 bg-shimmer rounded"></div>
        </div>

        {/* Action Buttons Placeholder */}
        <div className="absolute bottom-4 w-full flex justify-center gap-8">
          <div className="w-12 h-12 bg-shimmer rounded-full"></div>
          <div className="w-12 h-12 bg-shimmer rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Loginloader;
