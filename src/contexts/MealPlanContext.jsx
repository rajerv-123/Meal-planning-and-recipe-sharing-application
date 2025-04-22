"use client"

import { createContext, useContext, useState, useEffect } from "react"

const MealPlanContext = createContext()

export const useMealPlan = () => useContext(MealPlanContext)

export const MealPlanProvider = ({ children }) => {
  const [mealPlan, setMealPlan] = useState(() => {
    const savedMealPlan = localStorage.getItem("mealPlan")
    return savedMealPlan ? JSON.parse(savedMealPlan) : {}
  })

  useEffect(() => {
    localStorage.setItem("mealPlan", JSON.stringify(mealPlan))
  }, [mealPlan])

  const addMealToDay = (day, mealType, recipe) => {
    setMealPlan((prevPlan) => {
      const updatedPlan = { ...prevPlan }

      // Initialize day if it doesn't exist
      if (!updatedPlan[day]) {
        updatedPlan[day] = {}
      }

      // Initialize meal type if it doesn't exist
      if (!updatedPlan[day][mealType]) {
        updatedPlan[day][mealType] = []
      }

      // Check if recipe is already in the meal plan
      const isAlreadyAdded = updatedPlan[day][mealType].some((meal) => meal.id === recipe.id)

      if (!isAlreadyAdded) {
        updatedPlan[day][mealType] = [...updatedPlan[day][mealType], recipe]
      }

      return updatedPlan
    })
  }

  const removeMealFromDay = (day, mealType, recipeId) => {
    setMealPlan((prevPlan) => {
      const updatedPlan = { ...prevPlan }

      if (updatedPlan[day] && updatedPlan[day][mealType]) {
        updatedPlan[day][mealType] = updatedPlan[day][mealType].filter((meal) => meal.id !== recipeId)

        // Clean up empty arrays and objects
        if (updatedPlan[day][mealType].length === 0) {
          delete updatedPlan[day][mealType]
        }

        if (Object.keys(updatedPlan[day]).length === 0) {
          delete updatedPlan[day]
        }
      }

      return updatedPlan
    })
  }

  const clearMealPlan = () => {
    setMealPlan({})
  }

  const getMealsForDay = (day) => {
    return mealPlan[day] || {}
  }

  const value = {
    mealPlan,
    addMealToDay,
    removeMealFromDay,
    clearMealPlan,
    getMealsForDay,
  }

  return <MealPlanContext.Provider value={value}>{children}</MealPlanContext.Provider>
}
