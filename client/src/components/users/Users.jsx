import { Avatar } from "flowbite-react";
import { setSelectedUser } from "../../redux/features/users/allUsersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSocketContext } from "../../context/socketContext";

function Users({ user }) {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.allUser);

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  const isSelected = selectedUser && selectedUser._id === user?._id;

  return (
    <>
      <div
        className={`flex flex-row gap-4 items-center py-4 px-2  rounded cursor-pointer text-gray-400 ${
          isSelected ? "bg-blue-500 rounded-2xl text-white" : "null"
        }`}
        onClick={() => {
          dispatch(setSelectedUser(user));
        }}
      >
        {isOnline && isOnline ? (
          <Avatar img={user.profilePic} src="user" rounded status="online" />
        ) : (
          <Avatar img={user.profilePic} src="user" rounded />
        )}

        <span className="text-2xl font-bold">{user.username}</span>
      </div>
    </>
  );
}

export default Users;
