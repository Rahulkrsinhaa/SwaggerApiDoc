
import DefineTemplate from '../../components/DefineTemplate/DefineTemplate';
import { useState } from "react";
import "../DefineCategory/DefineCategory.css";
import { Edit, Trash } from "lucide-react";

const DefineScope = () => {
  const intialScopes  = [
    { name: "Scope 1", description: "Direct emissions from owned or controlled sources", active: true, selected: false },
    { name: "Scope 2", description: "Indirect emissions from the generation of purchased electricity, steam, heating and cooling", active: false, selected: false },
    { name: "Scope 3", description: "All other indirect emissions that occur in a company's value chain", active: true, selected: false },
  ];
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [scopes, setScopes] = useState(intialScopes);
  const [selectedEditRow, setSelectedEditRow] = useState(null); // For radio button (edit)
  const [selectedDeleteRows, setSelectedDeleteRows] = useState(new Set()); // For checkboxes (delete)
  const [errors, setErrors] = useState({ name: "", description: "" });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", description: "" };

    if (!name.trim()) {
      newErrors.name = "Scope Name is required";
      isValid = false;
    }
    if (!description.trim()) {
      newErrors.description = "Scope Description is required";
      isValid = false;
    }
    const isDuplicate = scopes.some(
      (scope) => scope.name.toLowerCase() === name.toLowerCase()
    );
    if (isDuplicate) {
      newErrors.name = "Scope with this name already exists."; // Error only for name
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
};

  const handleSave = () => {
     if (validateForm()) {
      const newScope = {
        name: name,
        description: description
      };

      if (selectedEditRow !== null) {
        // Update existing record
        const updatedScopes = [...scopes];
        updatedScopes[selectedEditRow] = newScope;
        setScopes(updatedScopes);
        setSelectedEditRow(null); // Clear edit mode after saving
      } else {
        // Add new record
        setScopes([...scopes, newScope]);
      }
      alert("Scope Saved Successfully.");
      resetForm(); // Reset form after saving
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setErrors({ name: "", description: "" });
    setSelectedEditRow(null); // Clear radio selection
    setSelectedDeleteRows(new Set()); // Clear checkbox selections
  };

  const handleDelete = () => {
    if (selectedDeleteRows.size > 0) {
      const newScope = scopes.filter((_, index) => !selectedDeleteRows.has(index));
      setScopes(newScope);
      setSelectedDeleteRows(new Set());
      setSelectedEditRow(null); // Clear radio selection after delete
    }
  };

  const handleCheckboxChange = (index) => {
    const newselectedDeleteRows = new Set(selectedDeleteRows);
    if (newselectedDeleteRows.has(index)) {
      newselectedDeleteRows.delete(index);
    } else {
      newselectedDeleteRows.add(index);
    }
    setSelectedDeleteRows(newselectedDeleteRows);
    // Clear single row selection if multiple rows are selected
    if (newselectedDeleteRows.size > 0 && selectedEditRow !== null) {
      setSelectedEditRow(null);
    }
  };

  const handleRadioChange = (index) => {
    setSelectedEditRow(index === selectedEditRow ? null : index); // Toggle off if same row clicked
    // Clear checkbox selections when a radio is selected
    if (index !== selectedEditRow) {
      setSelectedDeleteRows(new Set());
    }
  };


  return (
    <div className="container">
      <DefineTemplate title="Define Scope"></DefineTemplate>
      <div className="flexColumn">
        <div className="panel">
          <h2>Add New Scope</h2>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Scope Name"
              className={`input ${errors.name ? "error" : ""}`}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value.trim()) {
                  setErrors((prev) => ({ ...prev, name: "" }));
                }
              }}
            />
            {errors.name && <p className="errorText">{errors.name}</p>}
          </div>
          <div className="mb-1">
            <textarea
              placeholder="Scope Description"
              className={`textarea ${errors.description ? "error" : ""}`}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (e.target.value.trim()) {
                  setErrors((prev) => ({ ...prev, description: "" }));
                }
              }}
            />
            {errors.description && (
              <p className="errorText">{errors.description}</p>
            )}
          </div>
           {/* <div className="flex flex-col gap-2 ml-auto"></div> */}
          <div className="button" style={{ display: "flex", gap: "0.7rem" }}>
            <button
              className="buttonPrimary"
              onClick={handleSave}
              disabled={!!errors.name || !!errors.description}
            >
              Save
            </button>
            <button className="buttonSecondary" onClick={resetForm}>
              Reset
            </button>
          </div>
        </div>


        <div className="panel" style={{ marginTop: "1.5rem" }}>
          <h2>Defined Scope</h2>
          <div className="tableWrapper">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ color: 'gray' }}>Scope</th>
                  <th style={{ color: 'gray' }}>Description</th>
                  <th style={{ color: 'gray' }} className="center">Edit</th>
                  <th style={{ color: 'gray' }} className="center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {scopes.map((scope, index) => (
                  <tr
                    key={index}
                    className={selectedEditRow === index ? "selected" : ""}
                  >
                    <td>{scope.name}</td>
                    <td>{scope.description}</td>
                    <td className="center">
                      <input
                        type="radio"
                        name="editRow"
                        checked={selectedEditRow === index}
                        onChange={() => handleRadioChange(index)}
                      />
                    </td>
                    <td className="center">
                      <input
                        type="checkbox"
                        checked={selectedDeleteRows.has(index)}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </td> 
                  </tr>
                ))}
                <tr>
                  <td colSpan="2"></td> 

                  <td className="center" style={{ display: "flex", justifyContent: "center" }}>
                    <button
                      className="buttonPrimary buttonIcon"
                      onClick={() => alert("Edit functionality")}
                      disabled={selectedEditRow === null}
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
                        disabled={selectedDeleteRows.size === 0}
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

export default DefineScope;