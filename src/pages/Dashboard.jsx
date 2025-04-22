"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useTask } from "../contexts/TaskContext"
import { useNotification } from "../contexts/NotificationContext"
import { Link } from "react-router-dom"
import { FaTasks, FaImage, FaChartBar, FaCloudSun, FaSearch, FaUpload } from "react-icons/fa"
import { MdDragIndicator } from "react-icons/md"
import "../styles/Dashboard.css"

// Components
import StatCard from "../components/StatCard"
import RecentActivity from "../components/RecentActivity"
import TaskSummary from "../components/TaskSummary"
import WeatherWidget from "../components/WeatherWidget"

function Dashboard() {
  const { currentUser } = useAuth()
  const { tasks } = useTask()
  const { addNotification } = useNotification()
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    completedTasks: 0,
    pendingTasks: 0,
    totalTasks: 0,
  })

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    // Calculate task stats
    const completedTasks = tasks.filter((task) => task.completed).length
    const pendingTasks = tasks.length - completedTasks

    setStats({
      completedTasks,
      pendingTasks,
      totalTasks: tasks.length,
    })
  }, [tasks])

  const featureCards = [
    {
      title: "Task Management",
      icon: <FaTasks />,
      description: "Create, update, and track your tasks",
      link: "/todos",
    },
    {
      title: "Image Gallery",
      icon: <FaImage />,
      description: "Browse and manage your image collection",
      link: "/gallery",
    },
    {
      title: "Data Visualization",
      icon: <FaChartBar />,
      description: "View interactive charts and graphs",
      link: "/data-visualization",
    },
    {
      title: "Weather Forecast",
      icon: <FaCloudSun />,
      description: "Check current weather conditions",
      link: "/weather",
    },
    {
      title: "Drag & Drop Interface",
      icon: <MdDragIndicator />,
      description: "Try our intuitive drag and drop interface",
      link: "/drag-drop",
    },
    {
      title: "File Upload",
      icon: <FaUpload />,
      description: "Upload and manage your files",
      link: "/file-upload",
    },
    {
      title: "Advanced Search",
      icon: <FaSearch />,
      description: "Search with filters and sorting options",
      link: "/search",
    },
  ]

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {currentUser?.displayName || "User"}!</h1>
        <p className="dashboard-subtitle">Here's an overview of your activity</p>
      </div>

      <div className="dashboard-stats">
        <StatCard title="Completed Tasks" value={stats.completedTasks} icon="check-circle" color="green" />
        <StatCard title="Pending Tasks" value={stats.pendingTasks} icon="clock" color="orange" />
        <StatCard title="Total Tasks" value={stats.totalTasks} icon="list" color="blue" />
      </div>

      <div className="dashboard-content">
        <div className="dashboard-main">
          <section className="dashboard-section">
            <h2 className="section-title">Task Summary</h2>
            <TaskSummary tasks={tasks} />
          </section>

          <section className="dashboard-section">
            <h2 className="section-title">Features</h2>
            <div className="feature-cards">
              {featureCards.map((card, index) => (
                <Link to={card.link} key={index} className="feature-card">
                  <div className="feature-icon">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <div className="dashboard-sidebar">
          <section className="dashboard-section">
            <h2 className="section-title">Weather</h2>
            <WeatherWidget />
          </section>

          <section className="dashboard-section">
            <h2 className="section-title">Recent Activity</h2>
            <RecentActivity />
          </section>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
