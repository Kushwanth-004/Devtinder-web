import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-[linear-gradient(to_right,#0d0018,#3d0822,#ff2a6d)] shadow-[0_2px_12px_rgba(255,42,109,0.3)] px-6 py-3">
      <div className="flex-1">
        <a className="text-[1.75rem] font-bold text-white tracking-tight hover:text-[#ff2a6d] transition-colors duration-300">
          <span className="inline-flex items-center">
            DevTinder
            <span className="ml-1 text-[1rem]">💞</span>
          </span>
        </a>
      </div>
      {user && (
        <div className="flex gap-4">
          <p className="text-lg text-white font-light tracking-wide bg-[rgba(255,42,109,0.1)] px-4 py-2 rounded-[12px] shadow-[0_2px_8px_rgba(255,42,109,0.3)]">
            {"Welcome, " + user.firstName || "Guest"}
          </p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar relative group transition-all duration-300 hover:bg-[rgba(255,42,109,0.2)] hover:scale-102"
            >
              <div className="w-9 h-9 rounded-full border border-[rgba(255,42,109,0.5)] overflow-hidden">
                <img
                  alt="User avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[rgba(255,255,255,0.1)] backdrop-blur-[8px] rounded-[12px] z-10 mt-2 w-48 p-2 shadow-[0_4px_16px_rgba(255,42,109,0.3)] border border-[rgba(255,42,109,0.2)] animate-[slide-down_0.3s_ease-out]"
            >
              <li>
                <Link
                  to="/profile"
                  className="flex justify-between items-center text-pink-800 hover:bg-[rgba(255,42,109,0.15)] hover:text-[#ff2a6d] transition-all duration-300 rounded-[6px] px-3 py-1"
                >
                  Profile
                  <span className="badge bg-[rgba(255,42,109,0.8)] text-pink-800 border-none px-2 py-0.5 text-xs">
                    New
                  </span>
                </Link>
              </li>
              <li>
                <a className="text-pink-800 hover:bg-[rgba(255,42,109,0.15)] hover:text-[#ff2a6d] transition-all duration-300 rounded-[6px] px-3 py-1">
                  Settings
                </a>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-pink-800 hover:bg-[rgba(255,42,109,0.15)] hover:text-[#ff2a6d] transition-all duration-300 rounded-[6px] px-3 py-1"
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
