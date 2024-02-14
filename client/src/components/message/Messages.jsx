import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../redux/features/users/allUsersSlice";
import MessageSkeleton from "../skeleton/MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessage";

function Messages() {
  const dispatch = useDispatch();
  useListenMessages();
  const [loading, setLoading] = useState(false);
  const { messages, selectedUser } = useSelector((state) => state.allUser);
  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/v1/messages/get/${selectedUser._id}`);
        const data = await res.json();

        if (data.error) throw new Error(data.error);
        dispatch(setMessages(data));
      } catch (error) {
        // toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedUser?._id) getMessages();
  }, [selectedUser?._id, setMessages]);
  return (
    <div className="flex flex-col mt-4 h-[370px] overflow-y-auto p-4">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
}

export default Messages;
