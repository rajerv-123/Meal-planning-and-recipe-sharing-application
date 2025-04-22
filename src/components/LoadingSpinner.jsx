"use client"
import "../styles/LoadingSpinner.css"

function LoadingSpinner({ fullScreen = false }) {
  return (
    <div className={`spinner-container ${fullScreen ? "fullscreen" : ""}`}>
      <div className="spinner"></div>
      {fullScreen && <p className="loading-text">Loading...</p>}
    </div>
  )
}

export default LoadingSpinner
