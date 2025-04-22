"use client"

import { useState, useEffect } from "react"
import { FaSearch } from "react-icons/fa"
import "../styles/SearchDemo.css"

function SearchDemo() {
  const [searchTerm, setSearchTerm] = useState("")
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" })
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: "all",
  })

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      setLoading(true)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockItems = Array.from({ length: 50 }, (_, i) => ({
          id: i + 1,
          name: `Product ${i + 1}`,
          description: `This is a description for product ${i + 1}. It contains some details about the product.`,
          price: Math.floor(Math.random() * 200) + 10,
          category: ["Electronics", "Clothing", "Books", "Home"][Math.floor(Math.random() * 4)],
          rating: Math.floor(Math.random() * 5) + 1,
          inStock: Math.random() > 0.3,
        }))

        setItems(mockItems)
        setFilteredItems(mockItems)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    // Apply search, sort, and filters
    let result = [...items]

    // Apply search
    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply category filter
    if (filters.category !== "all") {
      result = result.filter((item) => item.category === filters.category)
    }

    // Apply price range filter
    if (filters.priceRange !== "all") {
      switch (filters.priceRange) {
        case "under50":
          result = result.filter((item) => item.price < 50)
          break
        case "50to100":
          result = result.filter((item) => item.price >= 50 && item.price <= 100)
          break
        case "over100":
          result = result.filter((item) => item.price > 100)
          break
        default:
          break
      }
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1
        }
        return 0
      })
    }

    setFilteredItems(result)
  }, [items, searchTerm, sortConfig, filters])

  const handleSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const categories = ["Electronics", "Clothing", "Books", "Home"]

  return (
    <div className="search-demo-container">
      <div className="search-demo-header">
        <h1>Advanced Search</h1>
        <p>Search, filter, and sort through items</p>
      </div>

      <div className="search-controls">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <label>Category:</label>
            <select value={filters.category} onChange={(e) => handleFilterChange("category", e.target.value)}>
              <option value="all">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Price Range:</label>
            <select value={filters.priceRange} onChange={(e) => handleFilterChange("priceRange", e.target.value)}>
              <option value="all">All Prices</option>
              <option value="under50">Under $50</option>
              <option value="50to100">$50 - $100</option>
              <option value="over100">Over $100</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="search-loading">
          <div className="spinner"></div>
          <p>Loading items...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="search-empty">
          <p>No items found matching your criteria</p>
        </div>
      ) : (
        <div className="search-results">
          <div className="results-header">
            <p>{filteredItems.length} items found</p>
            <div className="sort-controls">
              <span>Sort by:</span>
              <button
                className={`sort-button ${sortConfig.key === "name" ? "active" : ""}`}
                onClick={() => handleSort("name")}
              >
                Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </button>
              <button
                className={`sort-button ${sortConfig.key === "price" ? "active" : ""}`}
                onClick={() => handleSort("price")}
              >
                Price {sortConfig.key === "price" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </button>
              <button
                className={`sort-button ${sortConfig.key === "rating" ? "active" : ""}`}
                onClick={() => handleSort("rating")}
              >
                Rating {sortConfig.key === "rating" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </button>
            </div>
          </div>

          <div className="items-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="item-card">
                <div className="item-header">
                  <h3>{item.name}</h3>
                  <span className={`item-badge ${item.inStock ? "in-stock" : "out-of-stock"}`}>
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <div className="item-category">{item.category}</div>
                <p className="item-description">{item.description}</p>
                <div className="item-footer">
                  <div className="item-price">${item.price}</div>
                  <div className="item-rating">
                    {"★".repeat(item.rating)}
                    {"☆".repeat(5 - item.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchDemo
