"use client"

import { useEffect, useRef } from "react"
import { useTheme, THEMES } from "../contexts/ThemeContext"
import { FaSun, FaMoon, FaDesktop, FaTimes } from "react-icons/fa"
import "../styles/ThemePanel.css"

function ThemePanel() {
  const { currentTheme, isDarkMode, setTheme, isThemePanelOpen, toggleThemePanel } = useTheme()
  const panelRef = useRef(null)

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target) && isThemePanelOpen) {
        toggleThemePanel()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isThemePanelOpen, toggleThemePanel])

  // Prevent panel from being rendered if it's not open
  if (!isThemePanelOpen) return null

  const themeOptions = [
    { id: THEMES.LIGHT, label: "Light", icon: <FaSun /> },
    { id: THEMES.DARK, label: "Dark", icon: <FaMoon /> },
    { id: THEMES.SYSTEM, label: "System", icon: <FaDesktop /> },
  ]

  const colorThemes = [
    { id: THEMES.BLUE, label: "Blue", color: "#3b82f6" },
    { id: THEMES.PURPLE, label: "Purple", color: "#8b5cf6" },
    { id: THEMES.GREEN, label: "Green", color: "#10b981" },
  ]

  return (
    <div className="theme-panel-overlay">
      <div className="theme-panel" ref={panelRef}>
        <div className="theme-panel-header">
          <h3>Appearance</h3>
          <button className="close-panel" onClick={toggleThemePanel}>
            <FaTimes />
          </button>
        </div>

        <div className="theme-section">
          <h4>Theme Mode</h4>
          <div className="theme-options">
            {themeOptions.map((option) => (
              <button
                key={option.id}
                className={`theme-option ${currentTheme === option.id ? "active" : ""}`}
                onClick={() => setTheme(option.id)}
              >
                <span className="theme-icon">{option.icon}</span>
                <span className="theme-label">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="theme-section">
          <h4>Color Theme</h4>
          <div className="color-options">
            {colorThemes.map((theme) => (
              <button
                key={theme.id}
                className={`color-option ${currentTheme === theme.id ? "active" : ""}`}
                onClick={() => setTheme(theme.id)}
                style={{ "--theme-color": theme.color }}
              >
                <span className="color-swatch"></span>
                <span className="theme-label">{theme.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="theme-preview">
          <h4>Preview</h4>
          <div className={`preview-container ${isDarkMode ? "dark" : "light"}`}>
            <div className="preview-header"></div>
            <div className="preview-content">
              <div className="preview-card"></div>
              <div className="preview-card"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThemePanel
