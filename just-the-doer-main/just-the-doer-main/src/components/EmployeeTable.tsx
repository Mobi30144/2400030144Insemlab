import { useState } from "react";

type Employee = {
  name: string;
  department: string;
  salary: number;
};

type SortConfig = {
  key: keyof Employee;
  direction: "asc" | "desc";
};

const employeeData: Employee[] = [
  { name: "John Doe", department: "Engineering", salary: 75000 },
  { name: "Jane Smith", department: "Marketing", salary: 65000 },
  { name: "Mike Johnson", department: "Sales", salary: 60000 },
  { name: "Sarah Williams", department: "Engineering", salary: 80000 },
  { name: "Tom Brown", department: "HR", salary: 55000 },
  { name: "Emily Davis", department: "Marketing", salary: 70000 },
  { name: "David Wilson", department: "Sales", salary: 62000 },
  { name: "Lisa Anderson", department: "Engineering", salary: 85000 },
];

const EmployeeTable = () => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const handleSort = (key: keyof Employee) => {
    let direction: "asc" | "desc" = "asc";
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    
    setSortConfig({ key, direction });
  };

  const sortedData = [...employeeData].sort((a, b) => {
    if (!sortConfig) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const getSortIndicator = (key: keyof Employee) => {
    if (!sortConfig || sortConfig.key !== key) return " ⇅";
    return sortConfig.direction === "asc" ? " ↑" : " ↓";
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse border border-border">
        <thead>
          <tr className="bg-table-header">
            <th
              onClick={() => handleSort("name")}
              className="border border-border px-6 py-3 text-left font-semibold cursor-pointer hover:bg-table-hover transition-colors"
            >
              Name{getSortIndicator("name")}
            </th>
            <th
              onClick={() => handleSort("department")}
              className="border border-border px-6 py-3 text-left font-semibold cursor-pointer hover:bg-table-hover transition-colors"
            >
              Department{getSortIndicator("department")}
            </th>
            <th
              onClick={() => handleSort("salary")}
              className="border border-border px-6 py-3 text-left font-semibold cursor-pointer hover:bg-table-hover transition-colors"
            >
              Salary{getSortIndicator("salary")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((employee, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-table-row-even" : "bg-table-row-odd"
              } hover:bg-table-hover transition-colors`}
            >
              <td className="border border-border px-6 py-3">{employee.name}</td>
              <td className="border border-border px-6 py-3">{employee.department}</td>
              <td className="border border-border px-6 py-3">${employee.salary.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
