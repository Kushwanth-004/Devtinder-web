import TinderCard from "react-tinder-card";
import { FaTimes, FaHeart } from "react-icons/fa";

const UserCard = ({ user, onSwipeAction, index }) => {
  const { firstName, lastName, age, photoUrl, _id } = user;

  // ✅ Correct onSwipe usage
  const handleSwipe = (direction) => {
    onSwipeAction(direction, _id);
  };

  return (
    <TinderCard
      className="absolute flex justify-center items-center w-full h-full"
      onSwipe={handleSwipe}
      preventSwipe={["up", "down"]}
      flickOnSwipe={true} // ✅ Important to allow actual swipe
    >
      <div
        className="relative w-[330px] h-[500px] rounded-2xl bg-white border shadow-lg overflow-hidden flex flex-col justify-between"
        style={{ zIndex: 100 - index }}
      >
        {/* Profile Image */}
        <img
          src={
            photoUrl ||
            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          }
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 w-full h-[120px] bg-gradient-to-t from-black/70 to-transparent" />

        {/* Name + Age */}
        <div className="absolute bottom-16 left-4 text-white">
          <h2 className="text-xl font-semibold">
            {firstName} {lastName},{" "}
            <span className="font-normal">{age || "NA"}</span>
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-4 w-full flex justify-center gap-8">
          <button
            className="bg-white border-2 border-pink-300 text-pink-600 rounded-full w-12 h-12 flex items-center justify-center shadow hover:scale-110 transition"
            onClick={() => handleSwipe("left")}
          >
            <FaTimes />
          </button>
          <button
            className="bg-white border-2 border-pink-300 text-green-500 rounded-full w-12 h-12 flex items-center justify-center shadow hover:scale-110 transition"
            onClick={() => handleSwipe("right")}
          >
            <FaHeart />
          </button>
        </div>
      </div>
    </TinderCard>
  );
};

export default UserCard;
