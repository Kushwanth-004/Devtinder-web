import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import { Link } from "react-router-dom";
import ConnectionLoader from "../loader/ConnectionLoader";

const Connections = () => {
  const userConnections = useSelector((store) => store.Connection);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      res.status(400).send(err.msg);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!userConnections) return null;

  if (!loader && userConnections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-gray-600">
        <img
          src="https://cdn-icons-png.flaticon.com/512/5674/5674803.png"
          alt="No Connections"
          className="w-24 h-24 mb-4 opacity-70"
        />
        <h2 className="text-2xl font-semibold mb-2">No Connections Yet</h2>
        <p className="text-sm text-gray-500">
          Looks like you haven't made any connections. Explore and connect with
          others!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="text-center my-10 text-4xl font-bold text-rose-600">
        ❤️ Connections
      </div>
      {loader ? (
        <ConnectionLoader />
      ) : (
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

                  {about && (
                    <p className="text-sm mb-3 text-rose-500">{about}</p>
                  )}

                  {skills && (
                    <div className="mb-3">
                      <p className="text-xs text-rose-400 mb-1 font-semibold">
                        💡 Skills:
                      </p>
                      <p className="text-sm text-gray-700">{skills}</p>
                    </div>
                  )}

                  <div className="mt-4 flex justify-between items-center">
                    <Link
                      to={"/chat/" + _id}
                      className="bg-rose-500 text-white px-4 py-1 rounded-full hover:bg-rose-600 transition-all text-sm"
                    >
                      💬 Message
                    </Link>
                    <span className="text-sm text-rose-400">
                      🌹 Romantic vibes
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Connections;
