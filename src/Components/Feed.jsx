import axios from "axios";
import React, { use, useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const feedData = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data));
    } catch (err) {}
  };
  useEffect(() => {
    feedData();
  }, []);
  if (feed?.length <= 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-gray-600">
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
    feed && (
      <div className="bg-white">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
