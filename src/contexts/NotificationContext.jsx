"use client"

import { createContext, useContext, useState } from "react"
import { v4 as uuidv4 } from "uuid"

const NotificationContext = createContext()

export function useNotification() {
  return useContext(NotificationContext)
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])

  const addNotification = (message, type = "info", duration = 5000) => {
    const id = uuidv4()
    const newNotification = {
      id,
      message,
      type,
      timestamp: new Date(),
    }

    setNotifications((prev) => [...prev, newNotification])

    if (duration) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }

    return id
  }

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const value = {
    notifications,
    addNotification,
    removeNotification,
  }

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}
