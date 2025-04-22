"use client"

import { useRef, useEffect } from "react"
import "../styles/NutritionChart.css"

const NutritionChart = ({ nutrition }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current || !nutrition) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Calculate total calories
    const total = nutrition.calories

    // Calculate percentages
    const carbsPercent = ((nutrition.carbs * 4) / total) * 100
    const proteinPercent = ((nutrition.protein * 4) / total) * 100
    const fatPercent = ((nutrition.fat * 9) / total) * 100

    // Colors
    const colors = {
      carbs: "#4CAF50",
      protein: "#2196F3",
      fat: "#FF9800",
    }

    // Draw pie chart
    let startAngle = 0

    // Function to draw a slice
    const drawSlice = (percent, color) => {
      const sliceAngle = (percent / 100) * 2 * Math.PI
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2, canvas.height / 2)
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        Math.min(canvas.width, canvas.height) / 2 - 10,
        startAngle,
        startAngle + sliceAngle,
      )
      ctx.fillStyle = color
      ctx.fill()
      startAngle += sliceAngle
    }

    // Draw slices
    drawSlice(carbsPercent, colors.carbs)
    drawSlice(proteinPercent, colors.protein)
    drawSlice(fatPercent, colors.fat)

    // Draw center circle (donut hole)
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) / 4, 0, 2 * Math.PI)
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--bg-color").trim()
    ctx.fill()

    // Draw text in center
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--text-color").trim()
    ctx.font = "bold 16px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(`${total}`, canvas.width / 2, canvas.height / 2 - 10)
    ctx.font = "12px Arial"
    ctx.fillText("calories", canvas.width / 2, canvas.height / 2 + 10)
  }, [nutrition])

  if (!nutrition) return null

  return (
    <div className="nutrition-chart">
      <h3>Nutrition Information</h3>
      <div className="chart-container">
        <canvas ref={canvasRef} className="donut-chart"></canvas>
        <div className="nutrition-legend">
          <div className="legend-item">
            <span className="legend-color carbs"></span>
            <div className="legend-text">
              <span>Carbs</span>
              <span className="legend-value">{nutrition.carbs}g</span>
            </div>
          </div>
          <div className="legend-item">
            <span className="legend-color protein"></span>
            <div className="legend-text">
              <span>Protein</span>
              <span className="legend-value">{nutrition.protein}g</span>
            </div>
          </div>
          <div className="legend-item">
            <span className="legend-color fat"></span>
            <div className="legend-text">
              <span>Fat</span>
              <span className="legend-value">{nutrition.fat}g</span>
            </div>
          </div>
        </div>
      </div>
      <div className="nutrition-details">
        <div className="nutrition-item">
          <span>Calories</span>
          <span>{nutrition.calories}</span>
        </div>
        <div className="nutrition-item">
          <span>Fiber</span>
          <span>{nutrition.fiber}g</span>
        </div>
        <div className="nutrition-item">
          <span>Sugar</span>
          <span>{nutrition.sugar}g</span>
        </div>
        <div className="nutrition-item">
          <span>Sodium</span>
          <span>{nutrition.sodium}mg</span>
        </div>
      </div>
    </div>
  )
}

export default NutritionChart
