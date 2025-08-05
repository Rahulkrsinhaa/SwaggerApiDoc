import React, { useState } from "react";
import { Plus, RotateCcw, Pencil, Trash2 } from "lucide-react";
import Dropdown from "../../components/ui/Dropdown";
import DefineTemplate from "../../components/DefineTemplate/DefineTemplate";
import "./DefineEmitter.css";

const scopes = ["Scope 1", "Scope 2", "Scope 3"];
const categories = ["Category 1", "Category 2", "Category 3"];
const types = ["Solid", "Liquid", "Gas", "Electricity"];

const initialItems = [
  { id: 1, name: "Petrol", scope: "Scope 1", category: "Category 1", type: "Liquid", active: true, selected: false },
  { id: 2, name: "CNG", scope: "Scope 2", category: "Category 1", type: "Gas", active: true, selected: false },
  { id: 3, name: "Electricity", scope: "Scope 2", category: "Category 2", type: "Electricity", active: true, selected: true },
  { id: 4, name: "Petrol", scope: "Scope 1", category: "Category 1", type: "Liquid", active: true, selected: false },
  { id: 5, name: "CNG", scope: "Scope 2", category: "Category 1", type: "Gas", active: true, selected: false },
  { id: 6, name: "Electricity", scope: "Scope 2", category: "Category 2", type: "Electricity", active: true, selected: true },
];

const DefineEmitter = () => {
  const [name, setName] = useState("");
  const [scope, setScope] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const [items, setItems] = useState(initialItems);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const resetForm = () => {
    setName("");
    setScope("");
    setCategory("");
    setType("");
  };

  const toggleSelect = (index) => {
    const updated = [...items];
    updated[index].selected = !updated[index].selected;
    setItems(updated);
  };

  const handleAddItem = () => {
    if (!name || !scope || !category || !type) {
      alert("Please fill all fields.");
      return;
    }

    const isDuplicate = items.some(
        (item) =>
          item.name.toLowerCase() === name.toLowerCase() &&
          item.scope === scope &&
          item.category === category &&
          item.type === type
      );

      if (isDuplicate) {
        alert("Duplicate item already exists.");
        return;
      }

      alert("Item Added Successfully.");

    const newItem = {
      id: items.length + 1,
      name,
      scope,
      category,
      type,
      selected: false,
    };

    setItems([...items, newItem]);
    resetForm();
  };

  const handleDelete = () => {
    // Only delete items that are checked via checkboxes, ignore radio selection
    const selectedCheckboxes = items.filter((item) => item.selected);
    if (selectedCheckboxes.length > 0) {
      const newItems = items.filter((item) => !item.selected);
      setItems(newItems);
      
      // Reseting radio selection after deletion to avoid index misalignment
      setSelectedIndex(null);
    }
  };

  const hasSelectedCheckboxes = items.some((item) => item.selected);
  const hasSelectedRadio = selectedIndex !== null;

  return (
    <>
      <div className="container">
        <DefineTemplate title="Define Carbon Emitter" />

        {/* Add Form */}
        <div className="flexColumn">
          <div className="panel">
            <h2>Add New Item</h2>
            <div className="mb-4">
              <input
                className="input w-full"
                placeholder="<Name of Item>"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="dropdown-row flex gap-4 justify-start items-start w-full">
              <Dropdown label="Select Scope" options={scopes} selected={scope} onChange={setScope} />
              <Dropdown label="Select Category" options={categories} selected={category} onChange={setCategory} />
              <Dropdown label="Select Type" options={types} selected={type} onChange={setType} />
            </div>
            <div className="form-actions">
              <button
                className="btn btn-primary"
                onClick={handleAddItem}
              >
                <Plus size={16} /> Add
              </button>
              <button
                className="btn btn-secondary"
                onClick={resetForm}
              >
                <RotateCcw size={16} /> Reset
              </button>
            </div>
          </div>
        </div>

        {/* Defined Item Table */}
        <div className="panel defined-item-table">
          <h2 className="table-title">Defined Item</h2>
          <div className="table-container">
            <div className="table-scroll">
              <table className="w-full text-center border-collapse">
                <thead className="table-header">
                  <tr>
                    <th className="p-2 border">Item Name</th>
                    <th className="p-2 border">Scope</th>
                    <th className="p-2 border">Category</th>
                    <th className="p-2 border">Type</th>
                    <th className="p-2 border">Edit</th>
                    <th className="p-2 border">Select</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-blue-50 border-t">
                      <td className="p-2 border">{item.name}</td>
                      <td className="p-2 border">{item.scope}</td>
                      <td className="p-2 border">{item.category}</td>
                      <td className="p-2 border">{item.type}</td>
                      <td className="p-2 border">
                        <input
                          type="radio"
                          name="editItem"
                          checked={selectedIndex === idx}
                          onClick={() => setSelectedIndex(selectedIndex === idx ? null : idx)}
                        />
                      </td>
                      <td className="p-2 border">
                        <input
                          type="checkbox"
                          checked={item.selected}
                          onChange={() => toggleSelect(idx)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-footer">
              <div className="footer-left">
                <button
                  className="btn btn-primary"
                  onClick={() => alert("Edit functionality")}
                  disabled={!hasSelectedRadio}
                >
                  <Pencil size={16} /> Edit
                </button>
              </div>
              <div className="footer-right">
                <button
                  className="btn btn-danger"
                  onClick={handleDelete}
                  disabled={!hasSelectedCheckboxes}
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefineEmitter;
