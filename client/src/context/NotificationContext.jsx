import React, { createContext, useContext, useState } from "react"
import Notification from "../components/Notification"

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  })

  const showNotification = (message, severity = "info") => {
    setNotification({
      open: true,
      message,
      severity,
    })
  }

  const hideNotification = () => {
    setNotification((prev) => ({
      ...prev,
      open: false,
    }))
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={hideNotification}
      />
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider")
  }
  return context
}
