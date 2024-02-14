import { Avatar, Dropdown, Spinner } from "flowbite-react";
import { HiLogout, HiViewGrid } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/features/auth/userSlice";
import useGetAllUsers from "../hooks/useGetAllUsers";
import Users from "../components/users/Users";
import MessageContainer from "../components/message/MessageContainer";
import { setSelectedUser } from "../redux/features/users/allUsersSlice";
import SearchInput from "../components/search/SearchInput";

function ChatPage() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { loading, users } = useGetAllUsers();

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/v1/auth/logout", {
        method: "POST",
      });

      if (res.ok) {
        console.log("successfully logged out");
        dispatch(signoutSuccess());
        dispatch(setSelectedUser(null));
      } else {
        console.log("sign out failure");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-8 h-screen overflow-hidden">
      <div className="bg-blue-500">
        <div className="flex flex-row justify-between">
          <div className="my-4 mx-8">
            <h1 className="text-gray-300 dark:text-white font-bold text-4xl">
              Chit-Chat
            </h1>
          </div>
          <div className="my-4 mx-8">
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar alt="user" img={currentUser.profilePic} rounded />}
            >
              <Dropdown.Header>
                <span className="block text-sm">{currentUser.username}</span>
                <span className="block truncate text-sm font-medium">
                  @{currentUser.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item icon={HiViewGrid}>Profile</Dropdown.Item>

              <Dropdown.Divider />
              <Dropdown.Item icon={HiLogout} onClick={handleSignout}>
                Sign out
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </div>
      {/* container */}
      <div className="container mx-auto flex flex-row gap-2 overflow-hidden">
        {/* left side container */}
        <div className="flex-grow flex-1 border-r-2 overflow-y-auto">
          <SearchInput />
          {/* for getting users */}
          <div className="flex flex-col mt-4 h-[400px] overflow-y-auto mr-2">
            {users &&
              users.map((user) => (
                <div
                  key={user._id}
                  className="w-full hover:bg-gray-200 hover:rounded-2xl items-center justify-center"
                >
                  <Users user={user} />
                </div>
              ))}
            {loading ? (
              <>
                <Spinner size="xl" className="text-3xl font-bold" />
                <span className="pl-3">Loading...</span>
              </>
            ) : null}
          </div>
        </div>
        <div className="flex-grow flex-2 md:flex-1 overflow-y-auto ml-2">
          <div>
            <MessageContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
