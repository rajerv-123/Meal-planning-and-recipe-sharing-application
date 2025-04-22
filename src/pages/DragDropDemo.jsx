"use client"

import { useState } from "react"
import { useNotification } from "../contexts/NotificationContext"
import { FaGripVertical, FaPlus, FaTrash } from "react-icons/fa"
import "../styles/DragDrop.css"

function DragDropDemo() {
  const { addNotification } = useNotification()
  const [items, setItems] = useState([
    { id: 1, content: "Item 1", category: "todo" },
    { id: 2, content: "Item 2", category: "todo" },
    { id: 3, content: "Item 3", category: "in-progress" },
    { id: 4, content: "Item 4", category: "done" },
  ])
  const [newItemText, setNewItemText] = useState("")
  const [draggedItem, setDraggedItem] = useState(null)

  const categories = [
    { id: "todo", name: "To Do" },
    { id: "in-progress", name: "In Progress" },
    { id: "done", name: "Done" },
  ]

  const handleDragStart = (e, item) => {
    setDraggedItem(item)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, category) => {
    e.preventDefault()

    if (draggedItem) {
      const updatedItems = items.map((item) => (item.id === draggedItem.id ? { ...item, category } : item))

      setItems(updatedItems)
      addNotification(`Moved item to ${categories.find((c) => c.id === category).name}`, "success")
      setDraggedItem(null)
    }
  }

  const handleAddItem = (e) => {
    e.preventDefault()

    if (!newItemText.trim()) {
      return addNotification("Item text cannot be empty", "error")
    }

    const newItem = {
      id: Date.now(),
      content: newItemText,
      category: "todo",
    }

    setItems([...items, newItem])
    setNewItemText("")
    addNotification("Item added successfully", "success")
  }

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id))
    addNotification("Item deleted successfully", "success")
  }

  return (
    <div className="drag-drop-container">
      <div className="drag-drop-header">
        <h1>Drag & Drop Interface</h1>
        <p>Try moving items between categories</p>
      </div>

      <div className="add-item-form">
        <form onSubmit={handleAddItem}>
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Add new item..."
          />
          <button type="submit">
            <FaPlus /> Add Item
          </button>
        </form>
      </div>

      <div className="drag-drop-board">
        {categories.map((category) => (
          <div
            key={category.id}
            className="category-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, category.id)}
          >
            <div className="category-header">
              <h2>{category.name}</h2>
              <span className="item-count">{items.filter((item) => item.category === category.id).length}</span>
            </div>

            <div className="category-items">
              {items
                .filter((item) => item.category === category.id)
                .map((item) => (
                  <div key={item.id} className="drag-item" draggable onDragStart={(e) => handleDragStart(e, item)}>
                    <div className="drag-handle">
                      <FaGripVertical />
                    </div>
                    <div className="item-content">{item.content}</div>
                    <button className="delete-item" onClick={() => handleDeleteItem(item.id)}>
                      <FaTrash />
                    </button>
                  </div>
                ))}

              {items.filter((item) => item.category === category.id).length === 0 && (
                <div className="empty-category">
                  <p>No items</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DragDropDemo
