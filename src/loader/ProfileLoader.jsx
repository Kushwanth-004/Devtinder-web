import React from "react";

const ShimmerLine = ({ width = "100%", height = "20px", className = "" }) => (
  <div
    className={`bg-gradient-to-r from-[#ffe4ea] via-[#fbd6dd] to-[#ffe4ea] animate-pulse ${className}`}
    style={{
      width,
      height,
      borderRadius: "12px",
      marginBottom: "16px",
    }}
  />
);
const ProfileLoader = () => {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#ffdce2] via-[#ffb6c1] to-[#ff758f] p-6">
        <div className="bg-white/30 backdrop-blur-2xl border border-white/40 rounded-3xl p-10 w-[500px] max-w-full shadow-2xl">
          <div className="animate-pulse flex flex-col items-center">
            {/* Avatar shimmer */}
            <div className="rounded-full bg-gray-300 w-36 h-36 mb-8 shadow-lg" />

            {/* Input shimmer lines */}
            <ShimmerLine width="90%" />
            <ShimmerLine width="90%" />
            <ShimmerLine width="45%" />
            <ShimmerLine width="100%" />
            <ShimmerLine width="100%" />
            <ShimmerLine width="100%" />
            <ShimmerLine width="100%" />
            <ShimmerLine width="100%" height="80px" className="rounded-xl" />

            {/* Button shimmer */}
            <div className="bg-[#ff4f6d] h-12 w-full rounded-xl mt-6 animate-pulse shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLoader;
