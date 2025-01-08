import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../helpers/consts";

function useUsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        console.log("fetching users");

        const users = await actions.fetchUsers();
        setUsers(users);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const actions = {
    fetchUsers: async () => {
      const response = await axios.get(`${SERVER_URL}/users`, {
        withCredentials: true,
      });
      return response.data.users;
    },
  };

  return {
    users,
    actions,
    error,
    loading,
    setUsers,
    setError,
    setLoading,
    page,
    setPage,
  };
}

export default useUsersPage;
