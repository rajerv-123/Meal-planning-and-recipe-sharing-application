"use client"

import { useState, useEffect } from "react"
import RecipeCard from "./RecipeCard"
import "../styles/RecipeGrid.css"

const RecipeGrid = ({ recipes, filters = {} }) => {
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    // Apply filters
    let results = [...recipes]

    if (filters.category && filters.category !== "all") {
      results = results.filter((recipe) => recipe.category === filters.category)
    }

    if (filters.difficulty && filters.difficulty !== "all") {
      results = results.filter((recipe) => recipe.difficulty === filters.difficulty)
    }

    if (filters.time) {
      results = results.filter((recipe) => recipe.prepTime <= filters.time)
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      results = results.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchLower) ||
          recipe.ingredients.some((ing) => ing.toLowerCase().includes(searchLower)),
      )
    }

    // Simulate loading delay
    setTimeout(() => {
      setFilteredRecipes(results)
      setIsLoading(false)
    }, 500)
  }, [recipes, filters])

  if (isLoading) {
    return (
      <div className="recipe-grid-loading">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="recipe-card-skeleton">
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
              <div className="skeleton-title"></div>
              <div className="skeleton-meta">
                <div className="skeleton-meta-item"></div>
                <div className="skeleton-meta-item"></div>
                <div className="skeleton-meta-item"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (filteredRecipes.length === 0) {
    return (
      <div className="no-recipes-found">
        <h3>No recipes found</h3>
        <p>Try adjusting your filters or search criteria</p>
      </div>
    )
  }

  return (
    <div className="recipe-grid">
      {filteredRecipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}

export default RecipeGrid
