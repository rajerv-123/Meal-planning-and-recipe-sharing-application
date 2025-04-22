"use client"

import { useState, useEffect } from "react"
import { FaCloud, FaSun, FaSmog } from "react-icons/fa"
// import "../styles/Weather.css"

function Weather() {
  const [weatherData, setWeatherData] = useState(null)
  const [city, setCity] = useState("London")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true)
      setError(null)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock weather data
        const mockData = {
          name: city,
          temperature: Math.floor(Math.random() * 30),
          condition: ["Sunny", "Cloudy", "Rainy", "Foggy"][Math.floor(Math.random() * 4)],
          humidity: Math.floor(Math.random() * 100),
          windSpeed: Math.floor(Math.random() * 20),
        }

        setWeatherData(mockData)
      } catch (err) {
        setError("Could not fetch weather data.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [city])

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Sunny":
        return <FaSun />
      case "Cloudy":
        return <FaCloud />
      case "Rainy":
        return <FaCloud /> // Replace with rainy icon if available
      case "Foggy":
        return <FaSmog />
      default:
        return null
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newCity = e.target.elements.city.value
    setCity(newCity)
  }

  return (
    <div className="weather-page-container">
      <div className="weather-page-header">
        <h1>Weather</h1>
        <p>Check the current weather conditions</p>
      </div>

      <form onSubmit={handleSubmit} className="weather-form">
        <input type="text" name="city" placeholder="Enter city" />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <div className="weather-loading">Loading weather data...</div>
      ) : error ? (
        <div className="weather-error">{error}</div>
      ) : weatherData ? (
        <div className="weather-card">
          <h2>{weatherData.name}</h2>
          <div className="weather-info">
            <div className="weather-icon">{getWeatherIcon(weatherData.condition)}</div>
            <div className="weather-temp">{weatherData.temperature}°C</div>
            <div className="weather-condition">{weatherData.condition}</div>
          </div>
          <div className="weather-details">
            <p>Humidity: {weatherData.humidity}%</p>
            <p>Wind Speed: {weatherData.windSpeed} km/h</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Weather
