import React, { useState } from "react";
import "./SortableTable.css";

const SortableTable = () => {
  const initialData = [
    { name: "Alice", department: "HR", salary: 50000 },
    { name: "Bob", department: "IT", salary: 75000 },
    { name: "Charlie", department: "Finance", salary: 60000 },
    { name: "David", department: "IT", salary: 90000 },
    { name: "Eva", department: "Marketing", salary: 55000 },
  ];

  const [data, setData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sortBy = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setData(sortedData);
    setSortConfig({ key, direction });
  };

  return (
    <div className="table-container">
      <h2>Employee Data</h2>
      <table className="sortable-table">
        <thead>
          <tr>
            <th onClick={() => sortBy("name")}>Name</th>
            <th onClick={() => sortBy("department")}>Department</th>
            <th onClick={() => sortBy("salary")}>Salary</th>
          </tr>
        </thead>
        <tbody>
          {data.map((emp, index) => (
            <tr key={index}>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>{emp.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SortableTable;