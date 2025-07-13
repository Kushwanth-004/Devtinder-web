import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [age, setAge] = useState(user?.age || "");
  const [file, setFile] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");

  const handleUpdateProfile = async () => {
    setError("");
    try {
      let uploadedImageUrl = photoUrl;

      if (file) {
        const formData = new FormData();
        formData.append("photo", file);

        const uploadRes = await axios.put(`${BASE_URL}/profile/photo`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });

        uploadedImageUrl = uploadRes.data.imageUrl;
        setPhotoUrl(uploadedImageUrl);
      }

      const updateRes = await axios.patch(
        `${BASE_URL}/profile/update`,
        {
          firstName,
          lastName,
          photoUrl: uploadedImageUrl,
          about,
          skills,
          gender,
          age,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(updateRes?.data?.data));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        navigate("/feed");
      }, 3000);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.Error || "Update failed.");
    }
  };

  return (
    <div>
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-[rgba(255,82,141,0.9)] text-white px-6 py-3 rounded-xl shadow-[0_4px_20px_rgba(255,82,141,0.6)] border border-[rgba(255,82,141,0.5)] z-30 toast-animation flex items-center gap-2">
          <span>✅ Profile updated successfully!</span>
        </div>
      )}

      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#ffdce2] via-[#ffb6c1] to-[#ff758f] p-6">
        <div className="bg-white/20 backdrop-blur-2xl border border-white/30 rounded-2xl p-8 w-[420px] max-w-full shadow-[0_8px_30px_rgba(255,114,141,0.3)]">
          <h2 className="text-3xl font-semibold text-center text-[#ff4f6d] mb-4">
            Update Profile
          </h2>

          <div className="relative w-32 h-32 mx-auto rounded-full border-4 border-white shadow-xl overflow-hidden mb-4">
            <img
              src={photoUrl}
              alt="Profile Preview"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#ff4f6d] focus:ring-2 focus:ring-[#ff4f6d]/50"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#ff4f6d]"
            />
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#ff4f6d]"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full px-4 py-2 rounded-lg border border-[#ff4f6d]"
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#ff4f6d] bg-[#f5b5c0]"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male </option>
              <option value="Female">Female </option>
              <option value="Other">Other </option>
            </select>
            <input
              type="text"
              placeholder="Skills (comma separated)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#ff4f6d]"
            />
            <textarea
              placeholder="Tell us about yourself..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#ff4f6d]"
            />

            {error && (
              <p className="text-red-600 text-sm font-medium mt-2">{error}</p>
            )}

            <button
              type="button"
              onClick={handleUpdateProfile}
              className="w-full bg-[#ff4f6d] text-white px-6 py-2 rounded-lg font-medium text-lg shadow-md hover:bg-[#e63759] transition-all"
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
