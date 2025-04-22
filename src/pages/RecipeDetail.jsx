"use client";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaHeart,
  FaClock,
  FaUtensils,
  FaFire,
  FaPrint,
  FaShare,
  FaShoppingBasket,
  FaCalendarAlt,
} from "react-icons/fa";
import { useRecipes } from "../contexts/RecipeContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { useShoppingList } from "../contexts/ShoppingListContext";
import NutritionChart from "../components/NutritionChart";
import "../styles/RecipeDetail.css";

const RecipeDetail = () => {
  const { id } = useParams();
  const { getRecipeById, loading, error } = useRecipes();
  const { favorites, toggleFavorite } = useFavorites();
  const { addItemsFromRecipe } = useShoppingList();

  const [recipe, setRecipe] = useState(null);
  const [activeTab, setActiveTab] = useState("ingredients");

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!loading) {
      const foundRecipe = getRecipeById(id);
      setRecipe(foundRecipe);
    }
  }, [id, getRecipeById, loading]);

  const isFavorite = favorites.some((fav) => fav.id === id);

  const handleFavoriteClick = () => {
    if (recipe) {
      toggleFavorite(recipe);
    }
  };

  const handleAddToShoppingList = () => {
    if (recipe) {
      addItemsFromRecipe(recipe);
      alert("Ingredients added to your shopping list!");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareData = {
      title: recipe.title,
      text: `Check out this recipe: ${recipe.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Sharing failed:", err);
        alert("Oops! Something went wrong while sharing.");
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Clipboard copy failed:", err);
        alert("Failed to copy the link. Please try manually.");
      }
    }
  };

  if (loading) {
    return (
      <div className="recipe-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading recipe...</p>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="recipe-detail-error">
        <h2>Recipe Not Found</h2>
        <p>Sorry, we couldn't find the recipe you're looking for.</p>
        <Link to="/recipes" className="back-button">
          Back to Recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="recipe-detail">
      <div className="container">
        <div className="recipe-header">
          <div className="recipe-image-container">
            <img
              src={recipe.image || "/placeholder.svg"}
              alt={recipe.title}
              className="recipe-image"
            />
            <span className="recipe-category">{recipe.category}</span>
          </div>

          <div className="recipe-info">
            <h1 className="recipe-title">{recipe.title}</h1>

            <div className="recipe-meta">
              <div className="meta-item">
                <FaClock />
                <span>{recipe.prepTime} min</span>
              </div>
              <div className="meta-item">
                <FaUtensils />
                <span>{recipe.difficulty}</span>
              </div>
              <div className="meta-item">
                <FaFire />
                <span>{recipe.nutrition.calories} cal</span>
              </div>
            </div>

            <p className="recipe-description">{recipe.description}</p>

            <div className="recipe-actions">
              <button
                className={`action-button favorite-button ${
                  isFavorite ? "active" : ""
                }`}
                onClick={handleFavoriteClick}
              >
                <FaHeart />
                <span>{isFavorite ? "Saved" : "Save"}</span>
              </button>

              <button
                className="action-button"
                onClick={handleAddToShoppingList}
              >
                <FaShoppingBasket />
                <span>Add to List</span>
              </button>

              <button className="action-button" onClick={handlePrint}>
                <FaPrint />
                <span>Print</span>
              </button>

              <button className="action-button" onClick={handleShare}>
                <FaShare />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        <div className="recipe-content">
          <div className="recipe-tabs">
            <button
              className={`tab-button ${
                activeTab === "ingredients" ? "active" : ""
              }`}
              onClick={() => setActiveTab("ingredients")}
            >
              Ingredients
            </button>
            <button
              className={`tab-button ${
                activeTab === "instructions" ? "active" : ""
              }`}
              onClick={() => setActiveTab("instructions")}
            >
              Instructions
            </button>
            <button
              className={`tab-button ${
                activeTab === "nutrition" ? "active" : ""
              }`}
              onClick={() => setActiveTab("nutrition")}
            >
              Nutrition
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "ingredients" && (
              <div className="ingredients-tab">
                <h2>Ingredients</h2>
                <p className="servings-info">Servings: {recipe.servings}</p>
                <ul className="ingredients-list">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="ingredient-item">
                      {ingredient}
                    </li>
                  ))}
                </ul>
                <button
                  className="add-to-shopping-list"
                  onClick={handleAddToShoppingList}
                >
                  <FaShoppingBasket />
                  <span>Add All to Shopping List</span>
                </button>
              </div>
            )}

            {activeTab === "instructions" && (
              <div className="instructions-tab">
                <h2>Instructions</h2>
                <ol className="instructions-list">
                  {recipe.instructions.map((step, index) => (
                    <li key={index} className="instruction-step">
                      <span className="step-number">{index + 1}</span>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {activeTab === "nutrition" && (
              <div className="nutrition-tab">
                <h2>Nutrition Information</h2>
                <p className="nutrition-info">Per serving</p>
                <NutritionChart nutrition={recipe.nutrition} />
              </div>
            )}
          </div>
        </div>

        <div className="recipe-footer">
          <Link to="/recipes" className="back-button">
            Back to Recipes
          </Link>
          <Link to="/meal-planner" className="plan-button">
            <FaCalendarAlt />
            <span>Add to Meal Plan</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
