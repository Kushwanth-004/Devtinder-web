import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import ChatLoader from "../loader/ChatLoader";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userid = user?._id;
  const username = user?.firstName;
  const bottomRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userid || !targetUserId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", { userid, targetUserId, username });

    socket.on("message_received", ({ text, sender, time, senderName }) => {
      setMessages((prev) => [
        ...prev,
        { text, sender, time: time || new Date(), senderName },
      ]);
    });

    return () => socket.disconnect();
  }, [userid, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    socketRef.current.emit("send_message", {
      newMessage,
      userid,
      targetUserId,
      username,
    });

    setNewMessage("");
  };

  const fetchChatMessage = async () => {
    try {
      setLoader(true);
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });
      const chatmessages = chat?.data?.messages.map((msg) => ({
        sender: msg.senderId?._id,
        text: msg.text,
        time: msg.createdAt,
        senderName:
          msg.senderId?._id === userid
            ? "You"
            : `${msg.senderId?.firstName || "Unknown"}`,
      }));
      setMessages(chatmessages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchChatMessage();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      <div className="bg-rose-500 text-white text-center py-4 shadow-md text-2xl font-semibold">
        💬 Chat with Your Match
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {loader ? (
          <ChatLoader />
        ) : (
          <>
            {messages.map((msg, index) => {
              const isMe = msg.sender === userid;
              const time = new Date(msg.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
              return (
                <div
                  key={index}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div className="max-w-[75%]">
                    {!isMe && (
                      <div className="text-xs text-gray-600 font-semibold mb-1 ml-2">
                        {msg.senderName}
                      </div>
                    )}
                    <div
                      className={`px-4 py-2 rounded-2xl shadow-md text-base ${
                        isMe
                          ? "bg-rose-500 text-white rounded-br-none"
                          : "bg-white text-gray-800 rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div
                      className={`text-xs text-gray-500 mt-1 ml-2 ${
                        isMe ? "text-right" : "text-left"
                      }`}
                    >
                      {time}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      <div className="p-4 bg-white border-t border-rose-100 flex items-center gap-3 sticky bottom-0">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Type a sweet message..."
          className="flex-1 px-4 py-2 rounded-full border border-rose-200 shadow-sm focus:outline-none focus:ring-2 text-gray-800 focus:ring-rose-300"
        />
        <button
          onClick={sendMessage}
          className="bg-rose-500 text-white px-5 py-2 rounded-full shadow hover:bg-rose-600 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
