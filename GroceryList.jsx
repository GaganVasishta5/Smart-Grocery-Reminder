// src/components/GroceryList.jsx
import { useEffect, useState } from "react";

function GroceryList() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  // Load saved list on first render
  useEffect(() => {
    const saved = localStorage.getItem("grocery-items");
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  // Save list whenever it changes
  useEffect(() => {
    localStorage.setItem("grocery-items", JSON.stringify(items));
  }, [items]);

  const handleAddItem = () => {
    if (input.trim() === "") return;
    setItems([...items, input.trim()]);
    setInput("");
  };

  const handleDelete = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">
        <h5 className="card-title">🛒 Grocery List</h5>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add an item"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
          />
          <button className="btn btn-success" onClick={handleAddItem}>
            Add
          </button>
        </div>
        {items.length > 0 ? (
          <ul className="list-group">
            {items.map((item, index) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                {item}
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(index)}>
                  ❌
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No items yet. Start adding your groceries!</p>
        )}
      </div>
    </div>
  );
}

export default GroceryList;
