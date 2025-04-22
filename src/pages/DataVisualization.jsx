"use client"

import { useState, useEffect } from "react"
import { useTask } from "../contexts/TaskContext"
import "../styles/DataVisualization.css"

function DataVisualization() {
  const { tasks } = useTask()
  const [chartData, setChartData] = useState({
    taskCompletion: { completed: 0, pending: 0 },
    tasksByDay: {},
  })

  useEffect(() => {
    // Calculate task completion data
    const completed = tasks.filter((task) => task.completed).length
    const pending = tasks.length - completed

    // Calculate tasks by day
    const tasksByDay = tasks.reduce((acc, task) => {
      const date = new Date(task.createdAt).toLocaleDateString()
      if (!acc[date]) {
        acc[date] = 0
      }
      acc[date]++
      return acc
    }, {})

    setChartData({
      taskCompletion: { completed, pending },
      tasksByDay,
    })
  }, [tasks])

  // Render pie chart for task completion
  const renderPieChart = () => {
    const { completed, pending } = chartData.taskCompletion
    const total = completed + pending

    if (total === 0) {
      return (
        <div className="empty-chart">
          <p>No data available</p>
        </div>
      )
    }

    const completedPercentage = Math.round((completed / total) * 100)
    const pendingPercentage = 100 - completedPercentage

    return (
      <div className="pie-chart">
        <svg viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke={pending > 0 ? "#f59e0b" : "transparent"}
            strokeWidth="20"
            strokeDasharray="251.2"
            strokeDashoffset="0"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="#10b981"
            strokeWidth="20"
            strokeDasharray="251.2"
            strokeDashoffset={`${(pendingPercentage / 100) * 251.2}`}
            transform="rotate(-90 50 50)"
          />
          <text x="50" y="50" textAnchor="middle" dy=".3em" fontSize="15" fill="var(--text-color)">
            {completedPercentage}%
          </text>
        </svg>

        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: "#10b981" }}></span>
            <span>Completed ({completed})</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: "#f59e0b" }}></span>
            <span>Pending ({pending})</span>
          </div>
        </div>
      </div>
    )
  }

  // Render bar chart for tasks by day
  const renderBarChart = () => {
    const data = chartData.tasksByDay
    const days = Object.keys(data).sort((a, b) => new Date(a) - new Date(b))

    if (days.length === 0) {
      return (
        <div className="empty-chart">
          <p>No data available</p>
        </div>
      )
    }

    const maxValue = Math.max(...Object.values(data))

    return (
      <div className="bar-chart">
        <div className="chart-bars">
          {days.map((day, index) => (
            <div key={index} className="bar-group">
              <div className="bar" style={{ height: `${(data[day] / maxValue) * 200}px` }}>
                <span className="bar-value">{data[day]}</span>
              </div>
              <span className="bar-label">
                {new Date(day).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="data-viz-container">
      <div className="data-viz-header">
        <h1>Data Visualization</h1>
        <p>Visual representation of your task data</p>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h2>Task Completion</h2>
          {renderPieChart()}
        </div>

        <div className="chart-card">
          <h2>Tasks Created by Day</h2>
          {renderBarChart()}
        </div>
      </div>
    </div>
  )
}

export default DataVisualization
