"use client"
import { Link } from "react-router-dom"
import { FaCheckCircle, FaClock } from "react-icons/fa"
import "../styles/TaskSummary.css"

function TaskSummary({ tasks }) {
  // Get recent tasks (last 5)
  const recentTasks = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)

  // Calculate completion percentage
  const completionPercentage =
    tasks.length > 0 ? Math.round((tasks.filter((task) => task.completed).length / tasks.length) * 100) : 0

  return (
    <div className="task-summary">
      <div className="task-progress">
        <div className="progress-circle">
          <svg viewBox="0 0 36 36" className="circular-chart">
            <path
              className="circle-bg"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="circle"
              strokeDasharray={`${completionPercentage}, 100`}
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className="percentage">
              {completionPercentage}%
            </text>
          </svg>
        </div>
        <div className="progress-info">
          <h3>Task Completion</h3>
          <p>
            {tasks.filter((task) => task.completed).length} of {tasks.length} tasks completed
          </p>
        </div>
      </div>

      <div className="recent-tasks">
        <h3>Recent Tasks</h3>
        {recentTasks.length > 0 ? (
          <ul className="task-list">
            {recentTasks.map((task) => (
              <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
                <span className="task-status">{task.completed ? <FaCheckCircle /> : <FaClock />}</span>
                <span className="task-title">{task.title}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-tasks">No tasks yet</p>
        )}

        <Link to="/todos" className="view-all-link">
          View All Tasks
        </Link>
      </div>
    </div>
  )
}

export default TaskSummary
