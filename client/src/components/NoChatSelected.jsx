import React from "react";
import { TiMessage } from "react-icons/ti";
import { useSelector } from "react-redux";

function NoChatSelected() {
  const { currentUser } = useSelector((state) => state.user);
  const fullName = currentUser.fullName;
  return (
    <div className="flex items-center justify-center text-center mt-44">
      <div className="px-4 text-center sm:text-xl md:text-2xl text-gray-400 font-semibold flex flex-col items-center gap-2 justify-center  ">
        <p>Welcome 👋 {fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessage className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
}

export default NoChatSelected;
