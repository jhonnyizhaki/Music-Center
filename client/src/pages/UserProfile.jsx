import React from "react"
import { useAuth } from "../context/AuthContext"

const MyProfile = () => {
  const { user, logout } = useAuth()

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <a href="/myBookings">my bookings</a>
      <a href="/orders">my orders</a>
      {/* need to add a route */}
    </div>
  )
}

export default MyProfile
