import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const SwipeFeed = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  // Fetch feed users
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/feed", {
          withCredentials: true,
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch feed", err);
      }
    };

    fetchFeed();
  }, []);

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {}, {
        withCredentials: true,
      });
      dispatch(removeUserFromFeed(userId));
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (err) {
      console.error(err);
    }
  };

  const onSwipe = (direction, userId) => {
    if (direction === "right") {
      handleSendRequest("interested", userId);
    } else if (direction === "left") {
      handleSendRequest("ignored", userId);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-pink-100 p-6 overflow-hidden">
      <div className="relative w-[420px] h-[600px]">
        {users.map((user, index) => (
          <TinderCard
            className="absolute w-full h-full"
            key={user._id}
            onSwipe={(dir) => onSwipe(dir, user._id)}
            preventSwipe={["up", "down"]}
          >
            <div
              className="relative bg-white/20 backdrop-blur-2xl border border-white/30 rounded-2xl p-8 
              w-full h-full shadow-[0_8px_30px_rgba(255,114,141,0.3)] transition-all duration-500 flex flex-col justify-center items-center"
            >
              {/* Profile Image */}
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden mb-4">
                <img
                  src={
                    user.photoUrl ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <h3 className="text-3xl font-semibold text-[#ff4f6d] text-center">
                {user.firstName} {user.lastName}
              </h3>

              {/* About */}
              <p className="text-center text-gray-700 mt-2 px-4 italic text-sm">
                {user.about || "Looking for something special... 💖"}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {(user.skills || []).map((skill, i) => (
                  <span
                    key={i}
                    className="bg-white text-[#cd314b] px-3 py-1 rounded-full text-xs font-medium border border-[#ff4f6d]/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
};

export default SwipeFeed;
