import React, { useState } from "react";

const EditModal = ({ values, onSave, onCancel }) => {
  const [editedValues, setEditedValues] = useState(values);

  const handleInputChange = (e) => {
    setEditedValues({
      ...editedValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(editedValues);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Edit Record</h3>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={editedValues.name}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditModal;
