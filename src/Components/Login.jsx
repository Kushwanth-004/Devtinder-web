import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("sheswanthkuma@gmail.com");
  const [password, setPassword] = useState("Shes@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");

    } catch (Err) {
  
      setError(Err.response.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(155deg,#0d0018,#3d0822,#ff2a6d)] animate-[gradient-bg_12s_ease_infinite] overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute w-3 h-3 bg-[rgba(255,42,109,0.9)] rounded-full top-1/5 left-1/4 animate-[twinkle_3.5s_ease-in-out_infinite]"></div>
        <div className="absolute w-2 h-2 bg-[rgba(255,102,153,0.8)] rounded-full bottom-1/4 right-1/3 animate-[twinkle_4.5s_ease-in-out_infinite_delay-1s]"></div>
        <div className="absolute w-4 h-4 bg-[rgba(255,42,109,0.7)] rounded-full top-1/3 right-1/5 animate-[float_3s_ease-in-out_infinite]"></div>
        <div className="absolute w-96 h-96 bg-[rgba(255,42,109,0.35)] rounded-full blur-[160px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[pulse_5s_ease-in-out_infinite]"></div>
      </div>

      <div className="relative bg-[rgba(255,255,255,0.12)] backdrop-blur-[12px] p-8 rounded-[48px] shadow-[0_8px_28px_rgba(0,0,0,0.6)] max-w-sm w-full text-center border border-[rgba(255,42,109,0.4)] transition-all duration-400 ease-out hover:scale-105 hover:shadow-[0_12px_36px_rgba(255,42,109,0.6)] z-10">
        {/* Enhanced glowing accent */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-[rgba(255,42,109,1)] rounded-full blur-[24px] animate-[heartbeat_1.8s_ease-in-out_infinite_spin_6s_linear_infinite]"></div>

        <h2 className="text-[2.25rem] font-extrabold mb-4 text-transparent bg-clip-text bg-[linear-gradient(to_right,#ff2a6d,#ff6699,#3d0822)] animate-[text-glow_1.5s_ease-in-out_infinite] tracking-tight drop-shadow-[0_4px_12px_rgba(255,42,109,0.8)]">
          Welcome to Love
        </h2>
        <p className="text-sm text-[rgba(255,255,255,0.9)] mb-8 font-light tracking-wider animate-[fade-in_1s_ease-in-out]">
          Find your heart’s match ✨
        </p>

        <form className="space-y-5">
          <div className="relative group">
            <input
              value={emailId}
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
              type="email"
              placeholder="Your Email"
              className="w-full px-5 py-3 rounded-[12px] bg-[rgba(255,42,109,0.25)] text-white placeholder-[rgba(255,255,255,0.7)] border border-[rgba(255,42,109,0.6)] focus:bg-[rgba(255,42,109,0.35)] focus:outline-none focus:ring-2 focus:ring-[#ff2a6d] focus:border-none transition-all duration-300 ease-in-out group-hover:shadow-[0_0_12px_rgba(255,42,109,0.8)] animate-[slide-up_0.6s_ease-out]"
            />
            <span className="absolute inset-y-0 right-4 flex items-center text-[#ff2a6d] group-hover:scale-120 transition-transform duration-300">
              ✉️
            </span>
          </div>
          <div className="relative group">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Your Password"
              className="w-full px-5 py-3 rounded-[12px] bg-[rgba(255,42,109,0.25)] text-white placeholder-[rgba(255,255,255,0.7)] border border-[rgba(255,42,109,0.6)] focus:bg-[rgba(255,42,109,0.35)] focus:outline-none focus:ring-2 focus:ring-[#ff6699] focus:border-none transition-all duration-300 ease-in-out group-hover:shadow-[0_0_12px_rgba(255,42,109,0.8)] animate-[slide-up_0.8s_ease-out]"
            />
            <span className="absolute inset-y-0 right-4 flex items-center text-[#ff6699] group-hover:scale-120 transition-transform duration-300">
              🔒
            </span>
          </div>
          <p className="text-xl text-red-700">{error}</p>
          <button
            type="submit"
            onClick={handleLogin}
            className="w-full bg-[linear-gradient(to_right,#ff2a6d,#ff6699,#3d0822)] text-white py-3 rounded-[12px] font-bold text-base shadow-[0_6px_20px_rgba(255,42,109,0.7)] hover:shadow-[0_10px_28px_rgba(255,42,109,0.9)] hover:scale-107 transition-all duration-300 ease-in-out animate-[pulse_2s_ease-in-out_infinite_slide-up_1s_ease-out] hover:bg-[linear-gradient(to_left,#3d0822,#ff6699,#ff2a6d)]"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6">
          <p className="text-xs text-[rgba(255,255,255,0.85)] font-light tracking-wide animate-[fade-in_1.2s_ease-in-out]">
            New here?{" "}
            <a
              href="#"
              className="text-[#ff6699] hover:text-[#ff99b8] transition-colors duration-300 font-medium drop-shadow-[0_2px_4px_rgba(255,42,109,0.4)]"
            >
              Create an Account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
