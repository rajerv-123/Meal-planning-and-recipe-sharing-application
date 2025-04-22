"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import RecipeCard from "../components/RecipeCard"
import { useFavorites } from "../contexts/FavoritesContext"
import { FaHeart } from "react-icons/fa"
import "../styles/FavoritesPage.css"

const FavoritesPage = () => {
  const { favorites, clearFavorites } = useFavorites()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="favorites-page">
      <div className="container">
        <div className="page-header">
          <h1>Favorite Recipes</h1>
          <p>Your saved recipes collection</p>
        </div>

        {favorites.length === 0 ? (
          <div className="no-favorites">
            <div className="empty-icon">
              <FaHeart />
            </div>
            <h2>No favorites yet</h2>
            <p>Save your favorite recipes to find them here</p>
            <Link to="/recipes" className="browse-button">
              Browse Recipes
            </Link>
          </div>
        ) : (
          <>
            <div className="favorites-actions">
              <button className="clear-favorites" onClick={clearFavorites}>
                Clear All Favorites
              </button>
            </div>

            <div className="favorites-grid">
              {favorites.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default FavoritesPage
