"use client"

import { createContext, useContext, useState, useEffect } from "react"

const ShoppingListContext = createContext()

export const useShoppingList = () => useContext(ShoppingListContext)

export const ShoppingListProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("shoppingList")
    return savedItems ? JSON.parse(savedItems) : []
  })

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(items))
  }, [items])

  const addItem = (item) => {
    setItems((prevItems) => [...prevItems, item])
  }

  const removeItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
  }

  const toggleItem = (itemId) => {
    setItems((prevItems) => prevItems.map((item) => (item.id === itemId ? { ...item, checked: !item.checked } : item)))
  }

  const clearList = () => {
    setItems([])
  }

  const addItemsFromRecipe = (recipe) => {
    const newItems = recipe.ingredients.map((ingredient) => ({
      id: `${recipe.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: ingredient,
      quantity: "1",
      unit: "",
      category: "Recipe Items",
      checked: false,
    }))

    setItems((prevItems) => [...prevItems, ...newItems])
  }

  const value = {
    items,
    addItem,
    removeItem,
    toggleItem,
    clearList,
    addItemsFromRecipe,
  }

  return <ShoppingListContext.Provider value={value}>{children}</ShoppingListContext.Provider>
}
