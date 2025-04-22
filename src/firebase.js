// This file is now a simple mock authentication service
// instead of using Firebase
"use client"
// Mock user data
const mockUsers = [
  {
    id: "1",
    email: "user@example.com",
    password: "password123",
    displayName: "Demo User",
    photoURL: null,
    metadata: {
      creationTime: new Date().toISOString(),
    },
  },
]

// Simple local storage for registered users
const getUsers = () => {
  const storedUsers = localStorage.getItem("users")
  return storedUsers ? JSON.parse(storedUsers) : mockUsers
}

const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users))
}

export const auth = {
  currentUser: null,

  // Simple authentication methods
  createUserWithEmailAndPassword: async (email, password) => {
    const users = getUsers()

    // Check if user already exists
    if (users.find((user) => user.email === email)) {
      throw new Error("Email already in use")
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      displayName: "",
      photoURL: null,
      metadata: {
        creationTime: new Date().toISOString(),
      },
    }

    users.push(newUser)
    saveUsers(users)

    return { user: { ...newUser, password: undefined } }
  },

  signInWithEmailAndPassword: async (email, password) => {
    const users = getUsers()
    const user = users.find((user) => user.email === email && user.password === password)

    if (!user) {
      throw new Error("Invalid email or password")
    }

    // Don't return the password
    return { user: { ...user, password: undefined } }
  },

  signInWithPopup: async () => {
    // Mock Google sign in - just return the default user
    const users = getUsers()
    return { user: { ...users[0], password: undefined } }
  },

  signOut: async () => {
    auth.currentUser = null
    return Promise.resolve()
  },

  updateProfile: async (user, updates) => {
    const users = getUsers()
    const userIndex = users.findIndex((u) => u.id === user.id)

    if (userIndex >= 0) {
      users[userIndex] = {
        ...users[userIndex],
        ...updates,
      }

      saveUsers(users)
    }

    return Promise.resolve()
  },
}

// No need for these in our simplified version
export const db = {}
export const storage = {}

export default { auth, db, storage }
