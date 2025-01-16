import React from "react"
import { useAuth } from "../context/AuthContext"

const MyProfile = () => {
  const { user, logout } = useAuth()

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default MyProfile
