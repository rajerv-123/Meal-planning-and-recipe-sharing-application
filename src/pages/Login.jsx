"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useNotification } from "../contexts/NotificationContext"
import { FcGoogle } from "react-icons/fc"
import "../styles/Auth.css"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const { login, loginWithGoogle, setError } = useAuth()
  const { addNotification } = useNotification()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(email, password)
      addNotification("Successfully logged in!", "success")
      navigate("/")
    } catch (error) {
      setError("Failed to log in")
      addNotification(error.message, "error")
    }

    setLoading(false)
  }

  async function handleGoogleSignIn() {
    try {
      setError("")
      setLoading(true)
      await loginWithGoogle()
      addNotification("Successfully logged in with Google!", "success")
      navigate("/")
    } catch (error) {
      setError("Failed to log in with Google")
      addNotification(error.message, "error")
    }

    setLoading(false)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Log In</h2>

        <div className="default-credentials-note">
          <p>Default credentials:</p>
          <p>
            <strong>Email:</strong> user@example.com
          </p>
          <p>
            <strong>Password:</strong> password123
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button onClick={handleGoogleSignIn} className="google-button" disabled={loading}>
          <FcGoogle className="google-icon" />
          <span>Sign in with Google</span>
        </button>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
