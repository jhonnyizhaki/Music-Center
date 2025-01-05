import axios from "axios";
import { useState } from "react";
import { SERVER_URL } from "../helpers/consts";

function useLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const actions = {
    onEmailChange: (e) => {
      setEmail(e.target.value);
    },

    onPasswordChange: (e) => {
      setPassword(e.target.value);
    },

    login: async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${SERVER_URL}/auth/login`,
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        );
        console.log(response);
        window.location.href = "/";
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    },
  };
  return {
    email,
    password,
    loading,
    error,
    actions,
    setEmail,
    setPassword,
    setLoading,
    setError,
  };
}

export default useLoginPage;
