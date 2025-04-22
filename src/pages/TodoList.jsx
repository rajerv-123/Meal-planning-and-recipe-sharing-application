"use client"

import { useState } from "react"
import { useTask } from "../contexts/TaskContext"
import { useNotification } from "../contexts/NotificationContext"
import { FaPlus, FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa"
import "../styles/TodoList.css"

function TodoList() {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskCompletion } = useTask()
  const { addNotification } = useNotification()

  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskDescription, setNewTaskDescription] = useState("")
  const [editingTask, setEditingTask] = useState(null)
  const [filter, setFilter] = useState("all")

  function handleAddTask(e) {
    e.preventDefault()

    if (!newTaskTitle.trim()) {
      return addNotification("Task title cannot be empty", "error")
    }

    addTask(newTaskTitle, newTaskDescription)
    addNotification("Task added successfully", "success")

    // Reset form
    setNewTaskTitle("")
    setNewTaskDescription("")
  }

  function handleEditTask(task) {
    setEditingTask({
      ...task,
      title: task.title,
      description: task.description,
    })
  }

  function handleUpdateTask(e) {
    e.preventDefault()

    if (!editingTask.title.trim()) {
      return addNotification("Task title cannot be empty", "error")
    }

    updateTask(editingTask.id, {
      title: editingTask.title,
      description: editingTask.description,
    })

    addNotification("Task updated successfully", "success")
    setEditingTask(null)
  }

  function handleCancelEdit() {
    setEditingTask(null)
  }

  function handleDeleteTask(id) {
    deleteTask(id)
    addNotification("Task deleted successfully", "success")
  }

  function handleToggleCompletion(id) {
    toggleTaskCompletion(id)
  }

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed
    if (filter === "active") return !task.completed
    return true // 'all' filter
  })

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>Task Manager</h1>
        <p>Organize and track your tasks</p>
      </div>

      <div className="todo-content">
        <div className="todo-form-container">
          <h2>Add New Task</h2>
          <form onSubmit={handleAddTask} className="todo-form">
            <div className="form-group">
              <label htmlFor="taskTitle">Title</label>
              <input
                type="text"
                id="taskTitle"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="What needs to be done?"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="taskDescription">Description (optional)</label>
              <textarea
                id="taskDescription"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                placeholder="Add details about this task"
                rows="3"
              ></textarea>
            </div>

            <button type="submit" className="todo-button add-button">
              <FaPlus /> Add Task
            </button>
          </form>
        </div>

        <div className="todo-list-container">
          <div className="todo-list-header">
            <h2>Your Tasks</h2>
            <div className="todo-filters">
              <button className={`filter-button ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
                All
              </button>
              <button
                className={`filter-button ${filter === "active" ? "active" : ""}`}
                onClick={() => setFilter("active")}
              >
                Active
              </button>
              <button
                className={`filter-button ${filter === "completed" ? "active" : ""}`}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </div>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks found</p>
            </div>
          ) : (
            <ul className="todo-list">
              {filteredTasks.map((task) => (
                <li key={task.id} className={`todo-item ${task.completed ? "completed" : ""}`}>
                  {editingTask && editingTask.id === task.id ? (
                    <form onSubmit={handleUpdateTask} className="edit-form">
                      <div className="form-group">
                        <input
                          type="text"
                          value={editingTask.title}
                          onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <textarea
                          value={editingTask.description}
                          onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                          rows="2"
                        ></textarea>
                      </div>

                      <div className="edit-actions">
                        <button type="submit" className="todo-button save-button">
                          <FaCheck /> Save
                        </button>
                        <button type="button" className="todo-button cancel-button" onClick={handleCancelEdit}>
                          <FaTimes /> Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="todo-content">
                        <label className="checkbox-container">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggleCompletion(task.id)}
                          />
                          <span className="checkmark"></span>
                        </label>

                        <div className="todo-text">
                          <h3 className="todo-title">{task.title}</h3>
                          {task.description && <p className="todo-description">{task.description}</p>}
                          <span className="todo-date">{new Date(task.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="todo-actions">
                        <button className="todo-button edit-button" onClick={() => handleEditTask(task)}>
                          <FaEdit />
                        </button>
                        <button className="todo-button delete-button" onClick={() => handleDeleteTask(task.id)}>
                          <FaTrash />
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default TodoList
