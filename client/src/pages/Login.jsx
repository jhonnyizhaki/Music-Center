import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import axios from "axios"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const { fetchUserCart } = useCart()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login({ email, password })
      await fetchUserCart()
      navigate("/")
    } catch (error) {
      setError("Failed to log in")
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div style={{ display: "flex", gap: "5px" }}>
        <button type="submit" className="button">
          Login
        </button>
        <button
          type="button"
          className="outlineButton"
          onClick={async () => {
            const serverRes = await axios.post(
              "http://localhost:5000/auth/login/google"
            )
            window.location.href = serverRes.data.url
          }}
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 48 48"
          >
            <path
              fill="#ffc107"
              d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
            ></path>
            <path
              fill="#ff3d00"
              d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
            ></path>
            <path
              fill="#4caf50"
              d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
            ></path>
            <path
              fill="#1976d2"
              d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
            ></path>
          </svg>{" "}
          login with Google
        </button>
      </div>
    </form>
  )
}

export default Login
