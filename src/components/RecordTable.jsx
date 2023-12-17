import React from "react";
import "../styles/Table.css";
const RecordTable = ({ records, onDelete, onEdit }) => {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Records Table</h2>
      <table className="record-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Birthday</th>
            <th>City</th>
            <th>District</th>
            <th>Province</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record.name}</td>
              <td>{record.emailAddress}</td>
              <td>{record.phoneNumber}</td>
              <td>{record.birthday}</td>
              <td>{record.city}</td>
              <td>{record.district}</td>
              <td>{record.province}</td>
              <td>{record.country}</td>
              <td>
                <button onClick={() => onDelete(index)}>Delete</button>
                <button onClick={() => onEdit(index)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordTable;
