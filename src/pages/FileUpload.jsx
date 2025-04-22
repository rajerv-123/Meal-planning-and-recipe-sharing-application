"use client"

import { useState } from "react"
import { useNotification } from "../contexts/NotificationContext"
import { FaUpload, FaFile, FaImage, FaFileAlt, FaFilePdf, FaTrash } from "react-icons/fa"
import "../styles/FileUpload.css"

function FileUpload() {
  const { addNotification } = useNotification()
  const [files, setFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files)
    handleFiles(selectedFiles)
  }

  const handleFiles = (newFiles) => {
    if (newFiles.length === 0) return

    // Process files
    const processedFiles = newFiles.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
      file,
    }))

    setFiles((prev) => [...prev, ...processedFiles])
    addNotification(`${newFiles.length} file(s) added successfully`, "success")
  }

  const handleRemoveFile = (id) => {
    setFiles(files.filter((file) => file.id !== id))
    addNotification("File removed", "info")
  }

  const getFileIcon = (fileType) => {
    if (fileType.startsWith("image/")) return <FaImage />
    if (fileType === "application/pdf") return <FaFilePdf />
    if (fileType.includes("text/")) return <FaFileAlt />
    return <FaFile />
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB"
    return (bytes / (1024 * 1024)).toFixed(2) + " MB"
  }

  return (
    <div className="file-upload-container">
      <div className="file-upload-header">
        <h1>File Upload</h1>
        <p>Upload and manage your files</p>
      </div>

      <div
        className={`upload-area ${isDragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="upload-icon">
          <FaUpload />
        </div>
        <h3>Drag & Drop Files Here</h3>
        <p>or</p>
        <label className="upload-button">
          Browse Files
          <input type="file" multiple onChange={handleFileInput} style={{ display: "none" }} />
        </label>
        <p className="upload-hint">Supports images, documents, and other file types</p>
      </div>

      {files.length > 0 && (
        <div className="file-list">
          <h2>Uploaded Files</h2>
          <div className="files">
            {files.map((file) => (
              <div key={file.id} className="file-item">
                <div className="file-icon">{getFileIcon(file.type)}</div>
                <div className="file-info">
                  <h3 className="file-name">{file.name}</h3>
                  <p className="file-meta">{formatFileSize(file.size)}</p>
                </div>
                <button className="remove-file" onClick={() => handleRemoveFile(file.id)}>
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FileUpload
