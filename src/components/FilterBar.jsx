"use client"

import { useState } from "react"
import { FaFilter, FaTimes } from "react-icons/fa"
import "../styles/FilterBar.css"

const FilterBar = ({ onFilterChange, initialFilters = {} }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    category: initialFilters.category || "all",
    difficulty: initialFilters.difficulty || "all",
    time: initialFilters.time || 60,
    search: initialFilters.search || "",
  })

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    const newFilters = { ...filters, [name]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const resetFilters = {
      category: "all",
      difficulty: "all",
      time: 60,
      search: "",
    }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  const toggleFilters = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="filter-bar">
      <div className="filter-header">
        <h2>Find Recipes</h2>
        <button
          className={`toggle-filters ${isOpen ? "active" : ""}`}
          onClick={toggleFilters}
          aria-expanded={isOpen}
          aria-label="Toggle filters"
        >
          {isOpen ? <FaTimes /> : <FaFilter />}
          <span>Filters</span>
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          name="search"
          placeholder="Search recipes or ingredients..."
          value={filters.search}
          onChange={handleFilterChange}
          className="search-input"
        />
      </div>

      <div className={`filter-options ${isOpen ? "open" : ""}`}>
        <div className="filter-group">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={filters.category} onChange={handleFilterChange}>
            <option value="all">All Categories</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="dessert">Dessert</option>
            <option value="snack">Snack</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="difficulty">Difficulty</label>
          <select id="difficulty" name="difficulty" value={filters.difficulty} onChange={handleFilterChange}>
            <option value="all">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="time">Max Preparation Time: {filters.time} min</label>
          <input
            type="range"
            id="time"
            name="time"
            min="10"
            max="120"
            step="5"
            value={filters.time}
            onChange={handleFilterChange}
          />
          <div className="range-labels">
            <span>10 min</span>
            <span>120 min</span>
          </div>
        </div>

        <button className="clear-filters" onClick={clearFilters}>
          Clear All Filters
        </button>
      </div>
    </div>
  )
}

export default FilterBar
