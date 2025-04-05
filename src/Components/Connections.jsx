import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const userConnections = useSelector((store) => store.Connection);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    dispatch(addConnections(res?.data?.data));
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!userConnections) return;
  if (userConnections === 0) {
    return <div>No Connections</div>;
  }
  return (
    <>
      <div className="text-center my-10 text-4xl font-bold text-rose-600">
        ❤️ Connections
      </div>

      <div className="flex flex-wrap justify-center gap-8 px-4">
        {userConnections?.map((connection) => {
          const { firstName, lastName, photoUrl, about, skills, _id } =
            connection;
          return (
            <div
              key={_id}
              className="w-80 bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 rounded-3xl shadow-lg overflow-hidden border border-pink-300 hover:shadow-xl transition-all duration-300"
            >
              <img
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
                className="w-full h-60 object-cover"
              />

              <div className="p-5 text-rose-700">
                <h2 className="text-2xl font-bold mb-1">
                  {firstName} {lastName}
                </h2>

                {about && <p className="text-sm mb-3 text-rose-500">{about}</p>}

                {skills && (
                  <div className="mb-3">
                    <p className="text-xs text-rose-400 mb-1 font-semibold">
                      💡 Skills:
                    </p>
                  </div>
                )}

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-rose-400">
                    🌹 Romantic vibes
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Connections;
