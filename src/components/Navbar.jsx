"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUtensils,
  FaCalendarAlt,
  FaHeart,
  FaShoppingBasket,
  FaSearch,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const { darkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    console.log("Searching for:", searchQuery);
    setIsSearchOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <FaUtensils className="logo-icon" />
          <span>Culinary Compass</span>
        </Link>

        <div className="navbar-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <li className="navbar-item">
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              to="/recipes"
              className={location.pathname === "/recipes" ? "active" : ""}
            >
              Recipes
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              to="/meal-planner"
              className={location.pathname === "/meal-planner" ? "active" : ""}
            >
              <FaCalendarAlt className="nav-icon" />
              Meal Planner
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              to="/favorites"
              className={location.pathname === "/favorites" ? "active" : ""}
            >
              <FaHeart className="nav-icon" />
              Favorites
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              to="/shopping-list"
              className={location.pathname === "/shopping-list" ? "active" : ""}
            >
              <FaShoppingBasket className="nav-icon" />
              Shopping List
            </Link>
          </li>
        </ul>

        <div className="navbar-actions">
          <button
            className="action-button search-button"
            onClick={toggleSearch}
            aria-label="Search"
          >
            <FaSearch />
          </button>
          <button
            className="action-button theme-button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {isSearchOpen && (
          <div className="search-overlay">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit">
                <FaSearch />
              </button>
              <button
                type="button"
                className="close-search"
                onClick={toggleSearch}
              >
                <FaTimes />
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
