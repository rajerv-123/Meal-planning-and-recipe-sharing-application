"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import FilterBar from "../components/FilterBar"
import RecipeGrid from "../components/RecipeGrid"
import { useRecipes } from "../contexts/RecipeContext"
import "../styles/RecipesPage.css"

const RecipesPage = () => {
  const { recipes, loading } = useRecipes()
  const location = useLocation()

  // Parse query parameters
  const queryParams = new URLSearchParams(location.search)
  const categoryParam = queryParams.get("category")
  const searchParam = queryParams.get("search")

  const [filters, setFilters] = useState({
    category: categoryParam || "all",
    difficulty: "all",
    time: 120,
    search: searchParam || "",
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    // Update filters when URL params change
    if (categoryParam) {
      setFilters((prev) => ({ ...prev, category: categoryParam }))
    }
    if (searchParam) {
      setFilters((prev) => ({ ...prev, search: searchParam }))
    }
  }, [categoryParam, searchParam])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <div className="recipes-page">
      <div className="container">
        <div className="page-header">
          <h1>Recipes</h1>
          <p>Discover delicious recipes for every occasion</p>
        </div>

        <div className="recipes-content">
          <FilterBar onFilterChange={handleFilterChange} initialFilters={filters} />

          <div className="recipes-results">
            {loading ? (
              <div className="loading-message">Loading recipes...</div>
            ) : (
              <RecipeGrid recipes={recipes} filters={filters} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipesPage
