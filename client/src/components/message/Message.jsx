import { Avatar } from "flowbite-react";
import { useSelector } from "react-redux";

function Message({ message }) {
  const { messages, selectedUser } = useSelector((state) => state.allUser);
  const { currentUser } = useSelector((state) => state.user);
  const from = message && message.senderId === currentUser?._id;

  const formattedTime = message.createdAt;
  const time = new Date(formattedTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const chatClassName = from ? "chat-end" : "chat-start";
  const profilePic = from ? currentUser?.profilePic : selectedUser?.profilePic;
  const bubbleBgColor = from ? "bg-blue-500" : "";

  return (
    <div className="text-white text-sm sm:text-lg ">
      <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <Avatar alt="Tailwind CSS chat bubble component" src={profilePic} />
          </div>
        </div>
        <div
          className={`chat-bubble text-white ${bubbleBgColor} text-sm sm:text-lg  pb-2`}
        >
          {message.message}
        </div>
        <div className="chat-footer text-gray-500 opacity-50 text-xs flex gap-1 items-center">
          {time}
        </div>
      </div>
    </div>
  );
}

export default Message;
