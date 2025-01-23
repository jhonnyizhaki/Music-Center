import React, { createContext, useContext, useEffect, useState } from "react"
import { io } from "socket.io-client"
import { useAuth } from "./AuthContext"
import { useNotification } from "./NotificationContext"

const RealTimeContext = createContext()

export const RealTimeProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const { user } = useAuth()
  const { showNotification } = useNotification()

  useEffect(() => {
    if (user?.role === "admin") {
      const newSocket = io(import.meta.env.VITE_SERVER_URL)
      setSocket(newSocket)

      newSocket.on("newOrder", (order) => {
        showNotification(`New order received: #${order._id}`, "info")
      })

      newSocket.on("lowStock", (product) => {
        showNotification(
          `Low stock alert: ${product.name} (${product.stock} remaining)`,
          "warning"
        )
      })

      newSocket.on("error", (error) => {
        showNotification(error.message, "error")
      })

      return () => newSocket.close()
    }
  }, [user])

  return (
    <RealTimeContext.Provider value={{ socket }}>
      {children}
    </RealTimeContext.Provider>
  )
}

export const useRealTime = () => useContext(RealTimeContext)
