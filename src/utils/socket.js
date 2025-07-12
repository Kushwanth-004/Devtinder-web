import { io } from "socket.io-client";
import { BASE_URL } from "./constant";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL);
  } else {
    // return io("/", { path: "/api/socket.io" });
    return io("https://devtinder-backend-pa1s.onrender.com", {
      path: "/socket.io", // or "/api/socket.io" if you've set it
      transports: ["websocket"],
      withCredentials: true,
    });
  }
};
