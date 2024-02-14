// import { TiMessages } from "react-icons/ti";
import NoChatSelected from "./../NoChatSelected";
import { useSelector } from "react-redux";

import { Avatar } from "flowbite-react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

function MessageContainer() {
  const { currentUser } = useSelector((state) => state.user);

  const { selectedUser } = useSelector((state) => state.allUser);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedUser ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-blue-500 px-4 py-2 gap-2  flex flex-row items-center rounded-2xl">
            <span className="label-text">
              <Avatar
                img={selectedUser.profilePic}
                src="user"
                rounded
                size="sm"
              />
            </span>{" "}
            <span className="text-white text-xl font-bold">
              {selectedUser.fullName}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
}

export default MessageContainer;
