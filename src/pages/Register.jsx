"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useNotification } from "../contexts/NotificationContext"
import { FcGoogle } from "react-icons/fc"
import "../styles/Auth.css"

function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [loading, setLoading] = useState(false)

  const { signup, loginWithGoogle, updateUserProfile, setError } = useAuth()
  const { addNotification } = useNotification()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (password !== confirmPassword) {
      return addNotification("Passwords do not match", "error")
    }

    try {
      setError("")
      setLoading(true)
      const result = await signup(email, password)

      // Update profile with display name
      if (displayName) {
        await updateUserProfile(displayName)
      }

      addNotification("Account created successfully!", "success")
      navigate("/")
    } catch (error) {
      setError("Failed to create an account")
      addNotification(error.message, "error")
    }

    setLoading(false)
  }

  async function handleGoogleSignIn() {
    try {
      setError("")
      setLoading(true)
      await loginWithGoogle()
      addNotification("Successfully signed up with Google!", "success")
      navigate("/")
    } catch (error) {
      setError("Failed to sign up with Google")
      addNotification(error.message, "error")
    }

    setLoading(false)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>

        <div className="default-credentials-note">
          <p>You can register a new account or use the default credentials to log in:</p>
          <p>
            <strong>Email:</strong> user@example.com
          </p>
          <p>
            <strong>Password:</strong> password123
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="displayName">Name</label>
            <input type="text" id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
          </div>

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
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button onClick={handleGoogleSignIn} className="google-button" disabled={loading}>
          <FcGoogle className="google-icon" />
          <span>Sign up with Google</span>
        </button>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
