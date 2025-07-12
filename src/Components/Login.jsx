import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import Loginloader from "../loader/Loginloader";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [signUp, setSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const handleSignup = async () => {
    try {
      setLoader(true);
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data);
    } finally {
      setLoader(false);
    }
  };

  const handleLogin = async () => {
    try {
      setLoader(true);
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Login failed");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-white to-pink-100">
      <div className="bg-white border border-pink-100 shadow-lg rounded-2xl p-8 w-full max-w-sm transition-transform hover:scale-[1.02]">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6 drop-shadow-sm">
          {signUp ? "Create Account" : "Welcome Back"}
        </h2>
        {loader && (
          <div className="fixed inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50">
            <Loginloader />
          </div>
        )}

        <form className="space-y-4">
          {signUp && (
            <>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="input-style text-gray-800"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="input-style text-gray-800"
              />
            </>
          )}
          <input
            type="email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            placeholder="Email"
            className="input-style text-gray-800"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input-style text-gray-800"
          />

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="button"
            onClick={() => {
              signUp ? handleSignup() : handleLogin();
            }}
            className="w-full cursor-pointer bg-pink-500 text-white py-2 rounded-lg font-medium shadow-md hover:bg-pink-600 hover:shadow-pink-300 transition duration-200"
          >
            {signUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setSignUp((prev) => !prev)}
            className="text-sm text-pink-600 hover:underline cursor-pointer"
          >
            {signUp
              ? "Already have an account? Login"
              : "New user? Create an account"}
          </button>
        </div>
      </div>

      <style>{`
        .input-style {
          width: 100%;
          padding: 0.6rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          background-color: #fff;
          outline: none;
          transition: all 0.2s ease;
        }
        .input-style:focus {
          border-color: #ec4899;
          box-shadow: 0 0 0 2px rgba(236, 72, 153, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Login;
