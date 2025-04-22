"use client"
import { Link } from "react-router-dom"
import { FaHome, FaArrowLeft } from "react-icons/fa"
import "../styles/NotFound.css"

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>

        <div className="not-found-actions">
          <Link to="/" className="not-found-button primary">
            <FaHome /> Go to Home
          </Link>
          <button onClick={() => window.history.back()} className="not-found-button secondary">
            <FaArrowLeft /> Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
