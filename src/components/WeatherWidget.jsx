"use client"

import { useState, useEffect } from "react"
import { FaCloudSun, FaMapMarkerAlt } from "react-icons/fa"
import "../styles/WeatherWidget.css"

function WeatherWidget() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [location, setLocation] = useState("New York")

  useEffect(() => {
    // This is a mock function since we don't have a real API key
    // In a real app, you would use an actual weather API
    const fetchWeatherData = async () => {
      setLoading(true)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock weather data
        const mockWeather = {
          location: location,
          temperature: Math.floor(Math.random() * 30) + 10, // Random temp between 10-40
          condition: ["Sunny", "Cloudy", "Rainy", "Partly Cloudy"][Math.floor(Math.random() * 4)],
          humidity: Math.floor(Math.random() * 50) + 30, // Random humidity between 30-80%
          wind: Math.floor(Math.random() * 20) + 5, // Random wind between 5-25 km/h
        }

        setWeather(mockWeather)
        setError(null)
      } catch (err) {
        setError("Failed to fetch weather data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [location])

  const handleLocationChange = (e) => {
    e.preventDefault()
    // Update location and trigger a new fetch
    setLocation(e.target.elements.location.value)
  }

  if (loading) {
    return (
      <div className="weather-widget loading">
        <div className="weather-loading">
          <FaCloudSun className="loading-icon" />
          <p>Loading weather data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="weather-widget error">
        <p>{error}</p>
        <button onClick={() => setLocation("New York")}>Try Again</button>
      </div>
    )
  }

  return (
    <div className="weather-widget">
      <div className="weather-header">
        <div className="weather-location">
          <FaMapMarkerAlt />
          <h3>{weather.location}</h3>
        </div>

        <form onSubmit={handleLocationChange} className="location-form">
          <input type="text" name="location" placeholder="Change location" defaultValue={location} />
          <button type="submit">Update</button>
        </form>
      </div>

      <div className="weather-content">
        <div className="weather-main">
          <div className="weather-icon">
            {weather.condition === "Sunny" && "☀️"}
            {weather.condition === "Cloudy" && "☁️"}
            {weather.condition === "Rainy" && "🌧️"}
            {weather.condition === "Partly Cloudy" && "⛅"}
          </div>
          <div className="weather-temp">
            <h2>{weather.temperature}°C</h2>
            <p>{weather.condition}</p>
          </div>
        </div>

        <div className="weather-details">
          <div className="weather-detail">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{weather.humidity}%</span>
          </div>
          <div className="weather-detail">
            <span className="detail-label">Wind</span>
            <span className="detail-value">{weather.wind} km/h</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherWidget
