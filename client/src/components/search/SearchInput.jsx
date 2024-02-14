import { Button, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import { setSelectedUser } from "../../redux/features/users/allUsersSlice";
import { useDispatch } from "react-redux";

function SearchInput() {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState(null);
  const { users } = useGetAllUsers();
  const handleSearch = (e) => {
    if (!searchInput) return;
    e.preventDefault();
    if (searchInput.lenth < 3) {
      return;
    }

    const user = users.find((u) =>
      u.fullName.toLowerCase().includes(searchInput.toLowerCase())
    );
    if (user) {
      dispatch(setSelectedUser(user));
      setSearchInput("");
    } else {
      console.log("error in searching");
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-row gap-2 py-2 w-full">
      <TextInput
        placeholder="search..."
        className="w-full"
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <Button type="submit" className="mx-2">
        <HiSearch className="font-bold text-xl" />
      </Button>
    </form>
  );
}

export default SearchInput;
