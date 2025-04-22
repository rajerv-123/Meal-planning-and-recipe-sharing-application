"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { mockRecipes } from "../data/mockRecipes"

const RecipeContext = createContext()

export const useRecipes = () => useContext(RecipeContext)

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchRecipes = async () => {
      try {
        setLoading(true)
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setRecipes(mockRecipes)
      } catch (err) {
        setError("Failed to fetch recipes")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  const getRecipeById = (id) => {
    return recipes.find((recipe) => recipe.id === id) || null
  }

  const getRecipesByCategory = (category) => {
    return recipes.filter((recipe) => recipe.category === category)
  }

  const searchRecipes = (query) => {
    const searchTerm = query.toLowerCase()
    return recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(searchTerm) ||
        recipe.ingredients.some((ing) => ing.toLowerCase().includes(searchTerm)),
    )
  }

  const value = {
    recipes,
    loading,
    error,
    getRecipeById,
    getRecipesByCategory,
    searchRecipes,
  }

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
}
