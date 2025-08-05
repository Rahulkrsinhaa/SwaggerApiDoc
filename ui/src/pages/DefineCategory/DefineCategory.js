
import DefineTemplate from '../../components/DefineTemplate/DefineTemplate';
import React, { useState, useEffect } from "react";
import { Edit, Trash } from "lucide-react";
import "../DefineCategory/DefineCategory.css";

const DefineCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [selectedScope, setSelectedScope] = useState("Scope 1");
  const [categories, setCategories] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null); // For radio button (edit)
  const [selectedRows, setSelectedRows] = useState(new Set()); // For checkboxes (delete)
  const [errors, setErrors] = useState({ categoryName: "", categoryDescription: "" });


  const scopes = ["Scope 1", "Scope 2", "Scope 3"]; // Immutable array

  useEffect(() => {
    console.log("Selected Scope updated to:", selectedScope); // Debug re-renders
  }, [selectedScope]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { categoryName: "", categoryDescription: "" };

    if (!categoryName.trim()) {
      newErrors.categoryName = "Category Name is required";
      isValid = false;
    }
    if (!categoryDescription.trim()) {
      newErrors.categoryDescription = "Category Description is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      const newCategory = {
        name: categoryName,
        description: categoryDescription,
        scope: selectedScope,
      };

      if (selectedRow !== null) {
        // Update existing record
        const updatedCategories = [...categories];
        updatedCategories[selectedRow] = newCategory;
        setCategories(updatedCategories);
        setSelectedRow(null); // Clear edit mode after saving
      } else {
        // Add new record
        setCategories([...categories, newCategory]);
      }
    }
  };

  const resetForm = () => {
    setCategoryName("");
    setCategoryDescription("");
    setSelectedScope("Scope 1"); // Reset to default, but this is intentional
    setErrors({ categoryName: "", categoryDescription: "" });
    setSelectedRow(null); // Clear radio selection
    setSelectedRows(new Set()); // Clear checkbox selections
  };

  const handleDelete = () => {
    if (selectedRows.size > 0) {
      const newCategories = categories.filter((_, index) => !selectedRows.has(index));
      setCategories(newCategories);
      setSelectedRows(new Set());
      setSelectedRow(null); // Clear radio selection after delete
    }
  };

  const handleEdit = () => {
    if (selectedRow !== null) {
      const cat = categories[selectedRow];
      setCategoryName(cat.name);
      setCategoryDescription(cat.description);
      setSelectedScope(cat.scope); // Update scope based on selected row
      setErrors({ categoryName: "", categoryDescription: "" });
    }
  };

  const handleCheckboxChange = (index) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(index)) {
      newSelectedRows.delete(index);
    } else {
      newSelectedRows.add(index);
    }
    setSelectedRows(newSelectedRows);
    // Clear single row selection if multiple rows are selected
    if (newSelectedRows.size > 0 && selectedRow !== null) {
      setSelectedRow(null);
    }
  };

  const handleRadioChange = (index) => {
    setSelectedRow(index === selectedRow ? null : index); // Toggle off if same row clicked
    // Clear checkbox selections when a radio is selected
    if (index !== selectedRow) {
      setSelectedRows(new Set());
    }
  };

  return (
    <div className="container">
       <DefineTemplate title="Define Category"></DefineTemplate>
      <div className="flexColumn">
        <div className="panel">
          <h2>Add New Category</h2>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Category Name"
              className={`input ${errors.categoryName ? "error" : ""}`}
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value);
                if (e.target.value.trim()) {
                  setErrors((prev) => ({ ...prev, categoryName: "" }));
                }
              }}
            />
            {errors.categoryName && <p className="errorText">{errors.categoryName}</p>}
          </div>
          <div className="mb-1">
            <textarea
              placeholder="Category Description"
              className={`textarea ${errors.categoryDescription ? "error" : ""}`}
              value={categoryDescription}
              onChange={(e) => {
                setCategoryDescription(e.target.value);
                if (e.target.value.trim()) {
                  setErrors((prev) => ({ ...prev, categoryDescription: "" }));
                }
              }}
            />
            {errors.categoryDescription && (
              <p className="errorText">{errors.categoryDescription}</p>
            )}
          </div>
          <div className="mb-4">
            <label style={{ color: "#2563eb", fontWeight: "600" }}>Select Scope:</label>
            <select
              value={selectedScope}
              onChange={(e) => {
                console.log("Changing scope to:", e.target.value);
                setSelectedScope(e.target.value);
              }}
              className="input"
            >
              {scopes.map((scope) => (
                <option key={scope} value={scope}>
                  {scope}
                </option>
              ))}
            </select>
          </div>
          <div className="button" style={{ display: "flex", gap: "0.7rem" }}>
            <button
              className="buttonPrimary"
              onClick={handleSave}
              disabled={!!errors.categoryName || !!errors.categoryDescription}
            >
              Save
            </button>
            <button className="buttonSecondary" onClick={resetForm}>
              Reset
            </button>
          </div>
        </div>

        <div className="panel" style={{ marginTop: "1.5rem" }}>
          <h2>Defined Category</h2>
          <div className="tableWrapper">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ color: 'gray' }}>Category</th>
                  <th style={{ color: 'gray' }}>Description</th>
                  <th style={{ color: 'gray' }}>Scope</th>
                  <th style={{ color: 'gray' }} className="center">Edit</th>
                  <th style={{ color: 'gray' }} className="center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, index) => (
                  <tr
                    key={index}
                    className={selectedRow === index ? "selected" : ""}
                  >
                    <td>{cat.name}</td>
                    <td>{cat.description}</td>
                    <td>{cat.scope}</td>     
                    <td className="center">
                      <input
                        type="radio"
                        name="editRow"
                        checked={selectedRow === index}
                        onChange={() => handleRadioChange(index)}
                      />
                    </td>
                    <td className="center">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(index)}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </td> 
                  </tr>
                ))}
                <tr>
                  <td colSpan="3"></td> 

                  <td className="center" style={{ display: "flex", justifyContent: "center" }}>
                    <button
                      className="buttonPrimary buttonIcon"
                      onClick={handleEdit}
                      disabled={selectedRow === null}
                    >
                      <Edit className="iconGreen" />
                      Edit
                    </button>
                  </td>
                  <td className="center" >
                    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                      <button
                        className="buttonPrimary buttonIcon"
                        onClick={handleDelete}
                        disabled={selectedRows.size === 0}
                        style={{ backgroundColor: "#f87171", color: "white" }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "	#ef4444")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#dc2626 ")}>
                        <Trash className="iconGreen" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefineCategory;