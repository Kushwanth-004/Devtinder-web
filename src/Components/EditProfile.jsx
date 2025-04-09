import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [age, setAge] = useState(user?.age || "");
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleUpdateProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          about,
          skills,
          gender,
          age,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.Error);
    }
  };

  return (
    <div>
      {showToast && (
        <div
          className="fixed top-4 right-4 bg-[rgba(255,82,141,0.9)] text-white px-6 py-3 rounded-xl 
          shadow-[0_4px_20px_rgba(255,82,141,0.6)] border border-[rgba(255,82,141,0.5)] z-30 
          toast-animation flex items-center gap-2"
        >
          <span> Data saved successfully!</span>
        </div>
      )}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#ffdce2] via-[#ffb6c1] to-[#ff758f] p-6">
        <div
          className="bg-white/20 backdrop-blur-2xl border border-white/30 rounded-2xl p-8 
        w-[420px] max-w-full shadow-[0_8px_30px_rgba(255,114,141,0.3)] transition-all duration-500"
        >
          <h2 className="text-3xl font-semibold text-center text-[#ff4f6d]">
            Update Profile
          </h2>

          <div className="relative w-32 h-32 mx-auto mt-4 rounded-full border-4 border-white shadow-xl overflow-hidden">
            <img
              src={photoUrl}
              alt="Profile Preview"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <form className="mt-6 space-y-4">
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              placeholder="First Name"
              className="w-full px-4 py-2 rounded-lg border border-[#ff4f6d] focus:outline-none focus:ring-2 focus:ring-[#ff4f6d]/50"
            />
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              placeholder="Last Name"
              className="w-full px-4 py-2 rounded-lg border border-[#ff4f6d] focus:outline-none focus:ring-2 focus:ring-[#ff4f6d]/50"
            />
            <input
              type="number"
              name="age"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
              placeholder="Age"
              className="w-full px-4 py-2 rounded-lg border border-[#ff4f6d] focus:outline-none focus:ring-2 focus:ring-[#ff4f6d]/50"
            />
            <input
              type="url"
              name="photoUrl"
              value={photoUrl}
              onChange={(e) => {
                setPhotoUrl(e.target.value);
              }}
              placeholder="Profile Picture URL"
              className="w-full px-4 py-2 rounded-lg border border-[#ff4f6d] focus:outline-none focus:ring-2 focus:ring-[#ff4f6d]/50"
            />
            <select
              name="gender"
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
              className="w-full px-4 py-2 rounded-lg border border-[#ff4f6d] bg-[#f5b5c0] focus:outline-none focus:ring-2 focus:ring-[#ff4f6d]/50"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male </option>
              <option value="Female">Female </option>
              <option value="Other">Other </option>
            </select>
            <input
              type="text"
              name="skills"
              value={skills}
              onChange={(e) => {
                setSkills(e.target.value);
              }}
              placeholder="Skills (comma separated)"
              className="w-full px-4 py-2 rounded-lg border border-[#ff4f6d] focus:outline-none focus:ring-2 focus:ring-[#ff4f6d]/50"
            />
            <textarea
              name="about"
              value={about}
              onChange={(e) => {
                setAbout(e.target.value);
              }}
              placeholder="Tell us about yourself..."
              className="w-full px-4 py-2 rounded-lg border border-[#ff4f6d] focus:outline-none focus:ring-2 focus:ring-[#ff4f6d]/50"
            />
            <p className="text-red-600 text-sm font-medium mt-2">{error}</p>
            <button
              type="button"
              onClick={handleUpdateProfile}
              className="w-full bg-[#ff4f6d] text-white px-6 py-2 rounded-lg font-medium text-lg 
            shadow-md hover:bg-[#e63759] transition-all duration-300"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
