import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

function useGetAllUsers() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/v1/users/getusers");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setUsers(data);
      } catch (error) {
        // toast.error(error.message);
        console.log("errors while getting users");
      } finally {
        setLoading(false);
      }
    };

    getAllUsers();
  }, []);

  return { loading, users };
}
export default useGetAllUsers;
