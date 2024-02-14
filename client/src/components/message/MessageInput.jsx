import { useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../redux/features/users/allUsersSlice";

function MessageInput() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { messages, selectedUser } = useSelector((state) => state.allUser);
  const inputRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/messages/send/${selectedUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();

      if (data.error) throw new Error(data.error);
      if (res.ok) {
        dispatch(setMessages([...messages, data]));
      }
    } catch (error) {
      // toast.error(error.message);
    } finally {
      setLoading(false);
      setMessage("");
      inputRef.current.value = "";
    }
  };
  return (
    <form className="px-4 my-3 relative" onSubmit={handleSubmit}>
      <div className="flex items-center w-full">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          onChange={(e) => setMessage(e.target.value)}
          ref={inputRef}
        />
        <button
          type="submit"
          className="flex items-center justify-center bg-transparent border-none absolute top-0 right-0 h-full p-3 mr-6 text-white text-xl font-bold"
          disabled={loading}
        >
          <BsSend />
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
