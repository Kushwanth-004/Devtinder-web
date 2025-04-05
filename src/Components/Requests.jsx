import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();
  const handleStatusButton = async (status, req_id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + req_id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(req_id));
    } catch (err) {
      console.log(err);
    }
  };
  const fetchRequests = async () => {
    try {
      if (requests) {
        return;
      }
      const res = await axios.get(BASE_URL + "/user/request/recieved", {
        withCredentials: true,
      });
      const dataRecieved = res?.data?.data;
      dispatch(addRequest(dataRecieved));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (requests?.length === 0) return <div> No requests</div>;

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-pink-600 mb-10">
        💌 Requests Received
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {requests?.map((req, index) => {
          const { _id, firstName, lastName, about, photoUrl, skills } =
            req.fromUserId;

          return (
            <div
              key={_id}
              className="bg-white rounded-2xl shadow-lg p-6 w-80 hover:scale-105 transition-transform duration-300"
            >
              <img
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
                className="rounded-xl w-full h-52 object-cover mb-4"
              />
              <h2 className="text-2xl font-semibold text-pink-700 text-center">
                {firstName} {lastName}
              </h2>
              <p className="text-gray-600 text-center mt-1 italic">"{about}"</p>
              <div className="mt-4">
                <p className="text-pink-500 font-medium">Skills:</p>
                <p className="text-gray-700">{skills}</p>
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => handleStatusButton("accepted", req._id)}
                  className="bg-pink-400 text-white px-4 py-2 rounded-full hover:bg-pink-500 transition-all"
                >
                  Accept 💖
                </button>
                <button
                  onClick={() => handleStatusButton("rejected", req._id)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition-all"
                >
                  Ignore 💔
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
