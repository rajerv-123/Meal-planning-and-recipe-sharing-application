"use client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import RecipesPage from "./pages/RecipesPage"
import RecipeDetail from "./pages/RecipeDetail"
import MealPlannerPage from "./pages/MealPlannerPage"
import FavoritesPage from "./pages/FavoritesPage"
import ShoppingListPage from "./pages/ShoppingListPage"
import { RecipeProvider } from "./contexts/RecipeContext"
import { FavoritesProvider } from "./contexts/FavoritesContext"
import { MealPlanProvider } from "./contexts/MealPlanContext"
import { ShoppingListProvider } from "./contexts/ShoppingListContext"
import { ThemeProvider } from "./contexts/ThemeContext"
import "./styles/App.css"

function App() {
  return (
    <ThemeProvider>
      <RecipeProvider>
        <FavoritesProvider>
          <MealPlanProvider>
            <ShoppingListProvider>
              <Router>
                <div className="app">
                  <Navbar />
                  <main className="main-content">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/recipes" element={<RecipesPage />} />
                      <Route path="/recipes/:id" element={<RecipeDetail />} />
                      <Route path="/meal-planner" element={<MealPlannerPage />} />
                      <Route path="/favorites" element={<FavoritesPage />} />
                      <Route path="/shopping-list" element={<ShoppingListPage />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </Router>
            </ShoppingListProvider>
          </MealPlanProvider>
        </FavoritesProvider>
      </RecipeProvider>
    </ThemeProvider>
  )
}

export default App
