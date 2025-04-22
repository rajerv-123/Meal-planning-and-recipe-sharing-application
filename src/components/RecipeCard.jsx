"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { FaHeart, FaClock, FaUtensils, FaFire } from "react-icons/fa"
import { useFavorites } from "../contexts/FavoritesContext"
import "../styles/RecipeCard.css"

const RecipeCard = ({ recipe }) => {
  const { id, title, image, prepTime, difficulty, calories, category } = recipe
  const { favorites, toggleFavorite } = useFavorites()
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const isFavorite = favorites.some((fav) => fav.id === id)

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(recipe)
  }

  const getDifficultyColor = (level) => {
    switch (level.toLowerCase()) {
      case "easy":
        return "var(--success-color)"
      case "medium":
        return "var(--warning-color)"
      case "hard":
        return "var(--danger-color)"
      default:
        return "var(--text-color)"
    }
  }

  return (
    <div className="recipe-card">
      <Link to={`/recipes/${id}`} className="recipe-link">
        <div className="recipe-image-container">
          {!isImageLoaded && <div className="image-placeholder"></div>}
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className={`recipe-image ${isImageLoaded ? "loaded" : ""}`}
            onLoad={() => setIsImageLoaded(true)}
          />
          <span className="recipe-category">{category}</span>
          <button
            className={`favorite-button ${isFavorite ? "favorited" : ""}`}
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <FaHeart />
          </button>
        </div>

        <div className="recipe-content">
          <h3 className="recipe-title">{title}</h3>

          <div className="recipe-meta">
            <div className="meta-item">
              <FaClock />
              <span>{prepTime} min</span>
            </div>
            <div className="meta-item" style={{ color: getDifficultyColor(difficulty) }}>
              <FaUtensils />
              <span>{difficulty}</span>
            </div>
            <div className="meta-item">
              <FaFire />
              <span>{calories} cal</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default RecipeCard
