import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import Loginloader from "../loader/Loginloader";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const fetchFeed = async () => {
    try {
      setLoader(true);
      if (feed && feed.length > 0) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error("Feed fetch failed:", err);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Send request failed:", err);
    }
  };

  const handleSwipeAction = (direction, userId) => {
    if (direction === "right") {
      handleSendRequest("interested", userId);
    } else if (direction === "left") {
      handleSendRequest("ignored", userId);
    }
  };

  if (!feed || feed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-gray-600 min-h-screen bg-gradient-to-b from-[#fff0f3] to-[#ffdce2]">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="No users"
          className="w-24 h-24 mb-4 opacity-70"
        />
        <h2 className="text-2xl font-semibold mb-2">No More Users Found</h2>
        <p className="text-sm text-gray-500">
          Try again later or refresh the page.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#ffe4e9] via-[#ffced6] to-[#ffd2db] overflow-hidden">
      <div className="relative w-full max-w-md h-[600px]">
        {loader && (
          <div className="fixed inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50">
            <Loginloader />
          </div>
        )}
        {feed.map((user, index) => (
          <UserCard
            key={user._id}
            user={user}
            onSwipeAction={handleSwipeAction}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
