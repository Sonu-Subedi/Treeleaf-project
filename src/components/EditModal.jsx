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

  return <div className="modal"></div>;
};

export default EditModal;
