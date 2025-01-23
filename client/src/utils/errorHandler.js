import { useNotification } from "../context/NotificationContext"

export const getErrorMessage = (error, customMessage = null) => {
  return (
    customMessage ||
    error.response?.data?.message ||
    error.message ||
    "An unexpected error occurred"
  )
}

export const handleError = (error, customMessage = null) => {
  const { showNotification } = useNotification()

  console.error("Error:", error)

  const errorMessage = getErrorMessage(error, customMessage)

  showNotification(errorMessage, "error")
}
