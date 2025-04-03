import React from "react";
import TinderCard from "react-tinder-card";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, skills, about } = user;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br bg-white p-6">
      <div
        className="relative bg-white/20 backdrop-blur-2xl border border-white/30 rounded-2xl p-8 
        w-[420px] max-w-full shadow-[0_8px_30px_rgba(255,114,141,0.3)] transition-all duration-500"
      >
        {/* Profile Image */}
        <div className="relative w-32 h-32 mx-auto rounded-full border-4 border-white shadow-xl overflow-hidden">
          <img
            src={
              photoUrl ||
              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            }
            alt={`${firstName} ${lastName}'s Avatar`}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* User Details */}
        <h3 className="mt-6 text-3xl font-semibold text-center text-[#ff4f6d] drop-shadow-sm">
          {firstName} {lastName}
        </h3>
        <p className="text-sm text-gray-800 mt-2 text-center px-4 leading-relaxed font-light italic">
          {about || "Hoping to find someone special 💕"}
        </p>

        {/* Skills/Interests Section */}
        <div className="flex gap-2 mt-5 flex-wrap justify-center max-w-[90%]">
          {skills.map((tech, index) => (
            <span
              key={index}
              className="bg-white text-[#cd314b] px-4 py-1 rounded-full text-xs font-medium shadow-sm 
              border border-[#ff4f6d]/40 transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-5 w-full justify-center">
          <button
            className="bg-transparent border-2 border-[#ff4f6d] text-[#ff4f6d] px-7 py-2 rounded-full 
              font-medium text-lg hover:bg-[#ff4f6d] hover:text-white transition-all duration-300"
          >
            Like
          </button>
          <button
            className="bg-transparent border-2 border-[#ff4f6d] text-[#ff4f6d] px-7 py-2 rounded-full 
              font-medium text-lg hover:bg-[#ff4f6d] hover:text-white transition-all duration-300"
          >
            Pass
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
