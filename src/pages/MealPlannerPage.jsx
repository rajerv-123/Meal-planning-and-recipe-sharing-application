"use client"

import { useEffect } from "react"
import MealPlanCalendar from "../components/MealPlanCalendar"
import { useMealPlan } from "../contexts/MealPlanContext"
import { useShoppingList } from "../contexts/ShoppingListContext"
import { FaShoppingBasket } from "react-icons/fa"
import "../styles/MealPlannerPage.css"

const MealPlannerPage = () => {
  const { mealPlan, clearMealPlan } = useMealPlan()
  const { addItemsFromRecipe } = useShoppingList()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const generateShoppingList = () => {
    // Collect all recipes from the meal plan
    const allMeals = []

    Object.values(mealPlan).forEach((day) => {
      Object.values(day).forEach((mealType) => {
        mealType.forEach((meal) => {
          allMeals.push(meal)
        })
      })
    })

    // Add each recipe's ingredients to the shopping list
    allMeals.forEach((meal) => {
      addItemsFromRecipe(meal)
    })

    alert("Shopping list generated from your meal plan!")
  }

  return (
    <div className="meal-planner-page">
      <div className="container">
        <div className="page-header">
          <h1>Meal Planner</h1>
          <p>Plan your meals for the week</p>
        </div>

        <div className="meal-planner-actions">
          <button className="generate-list-button" onClick={generateShoppingList}>
            <FaShoppingBasket />
            <span>Generate Shopping List</span>
          </button>
          <button className="clear-plan-button" onClick={clearMealPlan}>
            Clear Meal Plan
          </button>
        </div>

        <MealPlanCalendar />

        <div className="meal-planner-tips">
          <h3>Tips for Meal Planning</h3>
          <ul>
            <li>Plan meals around your schedule - quick meals for busy days</li>
            <li>Include a variety of proteins, vegetables, and grains</li>
            <li>Consider leftovers when planning consecutive days</li>
            <li>Prep ingredients ahead of time for faster cooking</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MealPlannerPage
