"use client"

import { useEffect } from "react"
import ShoppingList from "../components/ShoppingList"
import "../styles/ShoppingListPage.css"

const ShoppingListPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="shopping-list-page">
      <div className="container">
        <div className="page-header">
          <h1>Shopping List</h1>
          <p>Manage your grocery shopping</p>
        </div>

        <ShoppingList />

        <div className="shopping-tips">
          <h3>Shopping Tips</h3>
          <ul>
            <li>Group items by store section to shop more efficiently</li>
            <li>Check your pantry before shopping to avoid duplicates</li>
            <li>Buy seasonal produce for better flavor and value</li>
            <li>Consider meal prep ingredients that can be used in multiple recipes</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ShoppingListPage
