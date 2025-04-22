"use client";
import {
  FaUtensils,
  FaHeart,
  FaGithub,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <FaUtensils className="logo-icon" />
          <h2>Culinary Compass</h2>
          <p>Discover, plan, and cook with confidence</p>
        </div>

        <div className="footer-links">
          <div className="footer-section">
            <h3>Explore</h3>
            <ul>
              <li>
                <a href="/recipes">Recipes</a>
              </li>
              <li>
                <a href="/meal-planner">Meal Planner</a>
              </li>
              <li>
                <a href="/favorites">Favorites</a>
              </li>
              <li>
                <a href="/shopping-list">Shopping List</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Categories</h3>
            <ul>
              <li>
                <a href="/recipes?category=breakfast">Breakfast</a>
              </li>
              <li>
                <a href="/recipes?category=lunch">Lunch</a>
              </li>
              <li>
                <a href="/recipes?category=dinner">Dinner</a>
              </li>
              <li>
                <a href="/recipes?category=dessert">Desserts</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Connect</h3>
            <div className="social-links">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Culinary Compass. All rights reserved.</p>
        <p>
          Made with <FaHeart className="heart-icon" /> by Rajeev
        </p>
      </div>
    </footer>
  );
};

export default Footer;
