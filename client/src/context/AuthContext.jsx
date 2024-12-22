import React, { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const register = async (userData) => {
    const { data } = await axios.post(
      "http://localhost:5000/auth/register",
      userData
    )
  }

  const login = async (userData) => {
    await axios.post("http://localhost:5000/auth/login", userData)
    await verifyToken()
  }

  const verifyToken = async () => {
    const { data } = await axios.get("http://localhost:5000/auth/verify")
    setUser(data)
  }

  const logout = () => {
    setUser(null)
  }

  useEffect(() => {
    verifyToken()
  }, [])

  return (
    <AuthContext.Provider value={{ user, register, logout, login }}>
      {children}
    </AuthContext.Provider>
  )
}
