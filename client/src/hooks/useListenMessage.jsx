import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setMessages } from "../redux/features/users/allUsersSlice";
import { useSocketContext } from "../context/socketContext";
import notificationSound from "./../assets/sounds/notification.mp3";
const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages } = useSelector((state) => state.allUser);
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;

      const sound = new Audio(notificationSound);

      sound.play();
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};
export default useListenMessages;
