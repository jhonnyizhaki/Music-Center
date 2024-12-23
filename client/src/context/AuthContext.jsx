import React, { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import urls from "../constant/URLS"
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
    const { data } = await axios.post(urls.REGISTER, userData)
  }

  const login = async (userData) => {
    await axios.post(urls.LOGIN, userData)
    await verifyToken()
  }

  const verifyToken = async () => {
    try {
      const { data } = await axios.get(urls.VERIFY)
      setUser(data)
    } catch (error) {
      console.error(error)
    }
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
