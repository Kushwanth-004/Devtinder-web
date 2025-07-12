const ChatLoader = () => {
  return (
    <div className="px-4 py-6 space-y-4 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
          <div className="max-w-[75%]">
            <div
              className={`h-4 w-24 mb-2 rounded-full ${
                i % 2 === 0 ? "ml-auto bg-rose-200" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`h-10 w-40 rounded-2xl ${
                i % 2 === 0 ? "bg-rose-300" : "bg-gray-200"
              }`}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatLoader;
