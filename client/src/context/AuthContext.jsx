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
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  
  // ------------------------------------------
  // פונקציית הרשמה
  const register = async (userData) => {
    const { data } = await axios.post(urls.REGISTER, userData)
  }

  // ------------------------------------------
  // פונקציית התחברות
  const login = async (userData) => {
    console.log("banana", userData)

    const { data } = await axios.post(urls.LOGIN, userData)

    // שמירת הטוקן
    localStorage.setItem("token", data.token)

    // הוספת הטוקן לכל הבקשות הבאות
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`

    await verifyToken()
  }

  // ------------------------------------------
  // פונקציית אימות טוקן
  const verifyToken = async () => {
    try {
      const token = localStorage.getItem("token")

      // ✅ אם אין טוקן, לא מנסים לאמת
      if (!token) {
        setUser(null)
        return
      }

      // שליחת בקשת אימות לשרת
      const { data } = await axios.get(urls.VERIFY, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log(data);

      setUser(data.user)
    } catch (error) {
      console.error(error)
      setUser(null)
    }
  }

  // ------------------------------------------
  // פונקציית התנתקות
  const logout = async () => {
    setIsLoggingOut(true)  // ✅ מסמן שיוצאים
    try {
      await axios.post(urls.LOGOUT)
    } catch (error) {
      console.error("Logout error:", error)
    }

    localStorage.removeItem("token")
    delete axios.defaults.headers.common["Authorization"]
    setUser(null)
  }


  // ------------------------------------------
  // useEffect לבדיקת התחברות קיימת
  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token || isLoggingOut) {   // ✅ אם יוצאים או אין טוקן — לא בודקים בכלל
      setUser(null)
      return
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

    verifyToken()

  }, [isLoggingOut])  // ✅ נוספה תלות


  // ------------------------------------------
  return (
    <AuthContext.Provider value={{ user, register, logout, login }}>
      {children}
    </AuthContext.Provider>
  )
}
