"use client"
import { FaCheckCircle, FaClock, FaList } from "react-icons/fa"
import "../styles/StatCard.css"

function StatCard({ title, value, icon, color }) {
  const getIcon = () => {
    switch (icon) {
      case "check-circle":
        return <FaCheckCircle />
      case "clock":
        return <FaClock />
      case "list":
        return <FaList />
      default:
        return null
    }
  }

  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-icon">{getIcon()}</div>
      <div className="stat-content">
        <h3 className="stat-value">{value}</h3>
        <p className="stat-title">{title}</p>
      </div>
    </div>
  )
}

export default StatCard
