"use client"

import { useState, useEffect } from "react"
import { useNotification } from "../contexts/NotificationContext"
import { FaImage, FaSearch, FaFilter } from "react-icons/fa"
import "../styles/Gallery.css"

function Gallery() {
  const { addNotification } = useNotification()
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    // Simulate fetching images
    const fetchImages = async () => {
      setLoading(true)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock image data
        const mockImages = Array.from({ length: 20 }, (_, i) => ({
          id: i + 1,
          title: `Image ${i + 1}`,
          description: `Description for image ${i + 1}`,
          url: `https://source.unsplash.com/random/300x300?sig=${i}`,
          tags: ["nature", "landscape", "abstract", "portrait"][Math.floor(Math.random() * 4)],
          date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
        }))

        setImages(mockImages)
      } catch (error) {
        addNotification("Failed to load images", "error")
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [addNotification])

  const filteredImages = images.filter(
    (image) =>
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.tags.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleImageClick = (image) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h1>Image Gallery</h1>
        <p>Browse and search your image collection</p>
      </div>

      <div className="gallery-search">
        <div className="search-input">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-options">
          <button className="filter-button">
            <FaFilter /> Filter
          </button>
        </div>
      </div>

      {loading ? (
        <div className="gallery-loading">
          <div className="spinner"></div>
          <p>Loading images...</p>
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="gallery-empty">
          <FaImage className="empty-icon" />
          <p>No images found</p>
        </div>
      ) : (
        <div className="gallery-grid">
          {filteredImages.map((image) => (
            <div key={image.id} className="gallery-item" onClick={() => handleImageClick(image)}>
              <div className="gallery-image">
                <img src={image.url || "/placeholder.svg"} alt={image.title} />
              </div>
              <div className="gallery-info">
                <h3>{image.title}</h3>
                <span className="gallery-tag">{image.tags}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-modal" onClick={closeModal}>
              &times;
            </span>
            <img src={selectedImage.url || "/placeholder.svg"} alt={selectedImage.title} />
            <div className="modal-info">
              <h2>{selectedImage.title}</h2>
              <p>{selectedImage.description}</p>
              <div className="modal-meta">
                <span className="modal-tag">{selectedImage.tags}</span>
                <span className="modal-date">{new Date(selectedImage.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery
