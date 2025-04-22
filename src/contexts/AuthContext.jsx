"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { auth } from "../firebase"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password).then(({ user }) => {
      setCurrentUser(user)
      return user
    })
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password).then(({ user }) => {
      setCurrentUser(user)
      return user
    })
  }

  function logout() {
    return auth.signOut().then(() => {
      setCurrentUser(null)
    })
  }

  function loginWithGoogle() {
    return auth.signInWithPopup().then(({ user }) => {
      setCurrentUser(user)
      return user
    })
  }

  function updateUserProfile(displayName, photoURL) {
    if (!currentUser) return Promise.reject("No user logged in")

    const updates = {
      displayName: displayName || currentUser.displayName,
      photoURL: photoURL || currentUser.photoURL,
    }

    return auth.updateProfile(currentUser, updates).then(() => {
      setCurrentUser({
        ...currentUser,
        ...updates,
      })
    })
  }

  useEffect(() => {
    // Check if there's a user in localStorage
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  // Save user to localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser))
    } else {
      localStorage.removeItem("currentUser")
    }
  }, [currentUser])

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loginWithGoogle,
    updateUserProfile,
    loading,
    error,
    setError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
