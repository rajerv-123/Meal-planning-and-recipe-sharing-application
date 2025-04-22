"use client"
import { useNotification } from "../contexts/NotificationContext"
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from "react-icons/fa"
import "../styles/Notification.css"

function NotificationCenter() {
  const { notifications, removeNotification } = useNotification()

  if (notifications.length === 0) {
    return null
  }

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <FaCheckCircle />
      case "error":
        return <FaExclamationCircle />
      default:
        return <FaInfoCircle />
    }
  }

  return (
    <div className="notification-center">
      {notifications.map((notification) => (
        <div key={notification.id} className={`notification-item ${notification.type}`}>
          <div className="notification-icon">{getIcon(notification.type)}</div>
          <div className="notification-content">
            <p>{notification.message}</p>
          </div>
          <button className="notification-close" onClick={() => removeNotification(notification.id)}>
            <FaTimes />
          </button>
        </div>
      ))}
    </div>
  )
}

export default NotificationCenter
