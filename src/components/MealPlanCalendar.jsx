"use client"

import { useState } from "react"
import { FaChevronLeft, FaChevronRight, FaPlus, FaTimes } from "react-icons/fa"
import { useMealPlan } from "../contexts/MealPlanContext"
import { useRecipes } from "../contexts/RecipeContext"
import "../styles/MealPlanCalendar.css"

const MealPlanCalendar = () => {
  const { mealPlan, addMealToDay, removeMealFromDay } = useMealPlan()
  const { recipes } = useRecipes()

  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedMealType, setSelectedMealType] = useState(null)
  const [isAddingMeal, setIsAddingMeal] = useState(false)

  // Get days for the current week
  const getDaysInWeek = (date) => {
    const day = date.getDay()
    const diff = date.getDate() - day + (day === 0 ? -6 : 1) // Adjust for Sunday
    const monday = new Date(date.setDate(diff))

    const days = []
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(monday)
      nextDay.setDate(monday.getDate() + i)
      days.push(nextDay)
    }

    return days
  }

  const daysInWeek = getDaysInWeek(new Date(currentDate))

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const isToday = (date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const getDayKey = (date) => {
    return date.toISOString().split("T")[0]
  }

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const handleNextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  const handleDayClick = (day, mealType) => {
    setSelectedDay(day)
    setSelectedMealType(mealType)
    setIsAddingMeal(true)
  }

  const handleAddMeal = (recipeId) => {
    if (selectedDay && selectedMealType) {
      const recipe = recipes.find((r) => r.id === recipeId)
      if (recipe) {
        addMealToDay(getDayKey(selectedDay), selectedMealType, recipe)
      }
    }
    setIsAddingMeal(false)
  }

  const handleRemoveMeal = (day, mealType, recipeId) => {
    removeMealFromDay(getDayKey(day), mealType, recipeId)
  }

  const mealTypes = ["breakfast", "lunch", "dinner", "snack"]

  return (
    <div className="meal-plan-calendar">
      <div className="calendar-header">
        <button className="calendar-nav" onClick={handlePrevWeek}>
          <FaChevronLeft />
        </button>
        <h2>
          {formatDate(daysInWeek[0])} - {formatDate(daysInWeek[6])}
        </h2>
        <button className="calendar-nav" onClick={handleNextWeek}>
          <FaChevronRight />
        </button>
      </div>

      <div className="calendar-grid">
        <div className="calendar-row header-row">
          <div className="calendar-cell meal-type-header"></div>
          {daysInWeek.map((day, index) => (
            <div key={index} className={`calendar-cell day-header ${isToday(day) ? "today" : ""}`}>
              <div className="day-name">{day.toLocaleDateString("en-US", { weekday: "short" })}</div>
              <div className="day-date">{day.getDate()}</div>
            </div>
          ))}
        </div>

        {mealTypes.map((mealType) => (
          <div key={mealType} className="calendar-row">
            <div className="calendar-cell meal-type-cell">
              <span className="meal-type">{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</span>
            </div>

            {daysInWeek.map((day, dayIndex) => {
              const dayKey = getDayKey(day)
              const meals = mealPlan[dayKey]?.[mealType] || []

              return (
                <div key={dayIndex} className="calendar-cell meal-cell">
                  {meals.length > 0 ? (
                    <div className="meal-items">
                      {meals.map((meal) => (
                        <div key={meal.id} className="meal-item">
                          <span className="meal-title">{meal.title}</span>
                          <button className="remove-meal" onClick={() => handleRemoveMeal(day, mealType, meal.id)}>
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                      <button className="add-meal-button small" onClick={() => handleDayClick(day, mealType)}>
                        <FaPlus />
                      </button>
                    </div>
                  ) : (
                    <button className="add-meal-button" onClick={() => handleDayClick(day, mealType)}>
                      <FaPlus />
                      <span>Add {mealType}</span>
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {isAddingMeal && (
        <div className="meal-selector-overlay">
          <div className="meal-selector">
            <div className="meal-selector-header">
              <h3>
                Add {selectedMealType} for {formatDate(selectedDay)}
              </h3>
              <button className="close-selector" onClick={() => setIsAddingMeal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="recipe-selector">
              <h4>Select a recipe:</h4>
              <div className="recipe-options">
                {recipes.map((recipe) => (
                  <div key={recipe.id} className="recipe-option" onClick={() => handleAddMeal(recipe.id)}>
                    <img src={recipe.image || "/placeholder.svg"} alt={recipe.title} />
                    <span>{recipe.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MealPlanCalendar
