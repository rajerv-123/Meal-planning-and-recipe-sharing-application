"use client";

import { useState } from "react";
import { FaCheck, FaPlus, FaTrash, FaPrint, FaShare } from "react-icons/fa";
import { useShoppingList } from "../contexts/ShoppingListContext";
import "../styles/ShoppingList.css";

const ShoppingList = () => {
  const { items, addItem, removeItem, toggleItem, clearList } =
    useShoppingList();
  const [newItem, setNewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newUnit, setNewUnit] = useState("");

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.trim()) {
      addItem({
        id: Date.now().toString(),
        name: newItem.trim(),
        quantity: newQuantity || "1",
        unit: newUnit || "",
        checked: false,
      });
      setNewItem("");
      setNewQuantity("");
      setNewUnit("");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const uncheckedItems = items.filter((item) => !item.checked);

    const listText = uncheckedItems.length
      ? uncheckedItems
          .map((item) => `• ${item.quantity} ${item.unit} ${item.name}`)
          .join("\n")
      : "Your shopping list is empty.";

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Shopping List",
          text: listText,
        });
      } catch (err) {
        alert("Error sharing the list.");
        console.error(err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(listText);
        alert("Shopping list copied to clipboard.");
      } catch (err) {
        alert("Failed to share or copy the list.");
        console.error(err);
      }
    }
  };

  const groupedItems = items.reduce((acc, item) => {
    const category = item.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  const sortedCategories = Object.keys(groupedItems).sort();

  return (
    <div className="shopping-list">
      <div className="shopping-list-header">
        <h2>Shopping List</h2>
        <div className="list-actions">
          <button className="list-action" onClick={handlePrint}>
            <FaPrint />
            <span>Print</span>
          </button>
          <button className="list-action" onClick={handleShare}>
            <FaShare />
            <span>Share</span>
          </button>
          <button className="list-action danger" onClick={clearList}>
            <FaTrash />
            <span>Clear</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleAddItem} className="add-item-form">
        <div className="form-row">
          <div className="form-group quantity">
            <input
              type="text"
              placeholder="Qty"
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
            />
          </div>
          <div className="form-group unit">
            <input
              type="text"
              placeholder="Unit"
              value={newUnit}
              onChange={(e) => setNewUnit(e.target.value)}
            />
          </div>
          <div className="form-group item">
            <input
              type="text"
              placeholder="Add an item..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="add-button">
            <FaPlus />
          </button>
        </div>
      </form>

      <div className="shopping-list-content">
        {items.length === 0 ? (
          <div className="empty-list">
            <p>Your shopping list is empty</p>
            <p>Add items or generate from your meal plan</p>
          </div>
        ) : (
          <>
            <div className="list-summary">
              <span>{items.length} items</span>
              <span>{items.filter((item) => item.checked).length} checked</span>
            </div>

            {sortedCategories.map((category) => (
              <div key={category} className="list-category">
                <h3 className="category-title">{category}</h3>
                <ul className="item-list">
                  {groupedItems[category].map((item) => (
                    <li
                      key={item.id}
                      className={`list-item ${item.checked ? "checked" : ""}`}
                    >
                      <button
                        className="check-button"
                        onClick={() => toggleItem(item.id)}
                      >
                        {item.checked && <FaCheck />}
                      </button>
                      <div className="item-details">
                        <span className="item-quantity">
                          {item.quantity} {item.unit}
                        </span>
                        <span className="item-name">{item.name}</span>
                      </div>
                      <button
                        className="remove-button"
                        onClick={() => removeItem(item.id)}
                      >
                        <FaTrash />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
