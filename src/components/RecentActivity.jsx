"use client"
import { useTask } from "../contexts/TaskContext"
import "../styles/RecentActivity.css"

function RecentActivity() {
  const { tasks } = useTask()

  // Get recent activities (task creation, completion, etc.)
  const recentActivities = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
    .map((task) => ({
      id: task.id,
      type: "task_created",
      title: task.title,
      timestamp: task.createdAt,
    }))

  // Format relative time (e.g., "2 hours ago")
  const getRelativeTime = (timestamp) => {
    const now = new Date()
    const past = new Date(timestamp)
    const diffInSeconds = Math.floor((now - past) / 1000)

    if (diffInSeconds < 60) {
      return "just now"
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`
    }

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
    }

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
    }

    return past.toLocaleDateString()
  }

  return (
    <div className="recent-activity">
      {recentActivities.length > 0 ? (
        <ul className="activity-list">
          {recentActivities.map((activity, index) => (
            <li key={index} className="activity-item">
              <div className="activity-icon">
                {activity.type === "task_created" && "📝"}
                {activity.type === "task_completed" && "✅"}
              </div>
              <div className="activity-content">
                <p className="activity-text">
                  {activity.type === "task_created" && `Created task "${activity.title}"`}
                  {activity.type === "task_completed" && `Completed task "${activity.title}"`}
                </p>
                <span className="activity-time">{getRelativeTime(activity.timestamp)}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-activity">No recent activity</p>
      )}
    </div>
  )
}

export default RecentActivity
