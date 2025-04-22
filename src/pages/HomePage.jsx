"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import Hero from "../components/Hero"
import RecipeCard from "../components/RecipeCard"
import { useRecipes } from "../contexts/RecipeContext"
import { FaUtensils, FaHeart, FaCalendarAlt, FaShoppingBasket } from "react-icons/fa"
import "../styles/HomePage.css"

const HomePage = () => {
  const { recipes, loading } = useRecipes()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Get featured recipes (first 6)
  const featuredRecipes = recipes.slice(0, 6)

  // Get recipes by category
  const getRecipesByCategory = (category) => {
    return recipes.filter((recipe) => recipe.category === category).slice(0, 4)
  }

  const categories = ["breakfast", "lunch", "dinner", "dessert"]

  return (
    <div className="home-page">
      <Hero />

      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaUtensils />
              </div>
              <h3>Discover Recipes</h3>
              <p>Browse our collection of delicious recipes for every occasion</p>
              <Link to="/recipes" className="feature-link">
                Explore Recipes
              </Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaHeart />
              </div>
              <h3>Save Favorites</h3>
              <p>Save your favorite recipes to easily find them later</p>
              <Link to="/favorites" className="feature-link">
                View Favorites
              </Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaCalendarAlt />
              </div>
              <h3>Plan Your Meals</h3>
              <p>Create weekly meal plans to stay organized</p>
              <Link to="/meal-planner" className="feature-link">
                Start Planning
              </Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaShoppingBasket />
              </div>
              <h3>Shopping Lists</h3>
              <p>Generate shopping lists from your meal plans</p>
              <Link to="/shopping-list" className="feature-link">
                Create List
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-recipes">
        <div className="container">
          <div className="section-header">
            <h2>Featured Recipes</h2>
            <Link to="/recipes" className="view-all">
              View All
            </Link>
          </div>

          {loading ? (
            <div className="recipes-loading">Loading recipes...</div>
          ) : (
            <div className="recipes-grid">
              {featuredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>
      </section>

      {categories.map((category) => (
        <section key={category} className="category-section">
          <div className="container">
            <div className="section-header">
              <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Recipes</h2>
              <Link to={`/recipes?category=${category}`} className="view-all">
                View All
              </Link>
            </div>

            {loading ? (
              <div className="recipes-loading">Loading recipes...</div>
            ) : (
              <div className="recipes-grid">
                {getRecipesByCategory(category).map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to start cooking?</h2>
            <p>Explore our recipes and create your meal plan today</p>
            <div className="cta-buttons">
              <Link to="/recipes" className="cta-button primary">
                Browse Recipes
              </Link>
              <Link to="/meal-planner" className="cta-button secondary">
                Plan Your Meals
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
