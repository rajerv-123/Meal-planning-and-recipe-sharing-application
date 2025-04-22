"use client"
import { Link } from "react-router-dom"
import { FaSearch, FaUtensils, FaCalendarAlt } from "react-icons/fa"
import "../styles/Hero.css"

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Discover Delicious Recipes</h1>
        <p>Find, save, and plan your meals with our collection of tasty recipes</p>

        <div className="hero-actions">
          <Link to="/recipes" className="hero-button primary">
            <FaSearch />
            <span>Browse Recipes</span>
          </Link>
          <Link to="/meal-planner" className="hero-button secondary">
            <FaCalendarAlt />
            <span>Plan Your Meals</span>
          </Link>
        </div>

        <div className="hero-features">
          <div className="feature">
            <div className="feature-icon">
              <FaUtensils />
            </div>
            <div className="feature-text">
              <h3>500+ Recipes</h3>
              <p>Explore our diverse collection</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <FaCalendarAlt />
            </div>
            <div className="feature-text">
              <h3>Meal Planning</h3>
              <p>Organize your weekly meals</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <FaSearch />
            </div>
            <div className="feature-text">
              <h3>Smart Search</h3>
              <p>Find recipes by ingredients</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
