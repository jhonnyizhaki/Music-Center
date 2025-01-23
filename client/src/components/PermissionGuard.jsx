import React from "react"
import { useAuth } from "../context/AuthContext"
import { hasPermission } from "../utils/permissions"

const PermissionGuard = ({ permission, children }) => {
  const { user } = useAuth()

  if (!hasPermission(user?.role, permission)) {
    return null
  }

  return children
}

export default PermissionGuard
