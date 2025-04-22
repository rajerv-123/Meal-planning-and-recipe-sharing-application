"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNotification } from "../contexts/NotificationContext"
import { FaUser, FaEnvelope, FaSignOutAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import "../styles/Profile.css"

function Profile() {
  const { currentUser, updateUserProfile, logout } = useAuth()
  const { addNotification } = useNotification()
  const navigate = useNavigate()

  const [displayName, setDisplayName] = useState("")
  const [photoURL, setPhotoURL] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || "")
      setPhotoURL(currentUser.photoURL || "")
    }
  }, [currentUser])

  async function handleProfileUpdate(e) {
    e.preventDefault()

    try {
      setLoading(true)
      await updateUserProfile(displayName, photoURL)
      addNotification("Profile updated successfully!", "success")
    } catch (error) {
      addNotification("Failed to update profile", "error")
    } finally {
      setLoading(false)
    }
  }

  async function handleLogout() {
    try {
      await logout()
      addNotification("Logged out successfully", "success")
      navigate("/login")
    } catch (error) {
      addNotification("Failed to log out", "error")
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>User Profile</h1>
        <p>Manage your account information</p>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar">
            {currentUser?.photoURL ? (
              <img src={currentUser.photoURL || "/placeholder.svg"} alt="Profile" />
            ) : (
              <div className="avatar-placeholder">
                <FaUser />
              </div>
            )}
          </div>

          <div className="profile-info">
            <h2>{currentUser?.displayName || "User"}</h2>
            <p>{currentUser?.email}</p>
            <p>
              Member since:{" "}
              {currentUser?.metadata.creationTime
                ? new Date(currentUser.metadata.creationTime).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        <div className="profile-form-container">
          <h2>Edit Profile</h2>
          <form onSubmit={handleProfileUpdate} className="profile-form">
            <div className="form-group">
              <label htmlFor="displayName">
                <FaUser /> Display Name
              </label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="photoURL">
                <FaUser /> Profile Picture URL
              </label>
              <input
                type="text"
                id="photoURL"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://example.com/profile.jpg"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <FaEnvelope /> Email
              </label>
              <input type="email" id="email" value={currentUser?.email || ""} disabled />
              <small>Email cannot be changed</small>
            </div>

            <button type="submit" className="profile-button update-button" disabled={loading}>
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>

          <div className="profile-actions">
            <button onClick={handleLogout} className="profile-button logout-button">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
