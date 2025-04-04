import axios from "axios";
import React, { use, useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./userCard";

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
    } catch (err) {
    
    }
  };
  useEffect(() => {
    feedData();
  }, []);
  return (
    feed && (
      <div className="bg-white">
        <UserCard user={feed[3]} />
      </div>
    )
  );
};

export default Feed;
