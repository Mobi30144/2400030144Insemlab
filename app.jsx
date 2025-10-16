import React, { useState, useEffect } from 'react';

const employeeData = [
  { f_name: 'Mobina Mohammad', department: 'Design', salary: 1000000000000 },
  { f_name: 'Mohin', department: 'Design', salary: 1000000000 },
  { f_name: 'Afreen', department: 'Design', salary: 1000000000 },
  { f_name: 'Alice', department: 'Engineering', salary: 70000 },
  { f_name: 'Bob', department: 'Design', salary: 65000 },
  { f_name: 'Charlie', department: 'HR', salary: 60000 },
  { f_name: 'David', department: 'Engineering', salary: 72000 },
  { f_name: 'Eve', department: 'Marketing', salary: 68000 },
  { f_name: 'Frank', department: 'Design', salary: 64000 },
];

function App() {
  const [data, setData] = useState(employeeData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const sortBy = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sorted = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setData(sorted);
    setSortConfig({ key, direction });
  };

  const filteredData = data.filter((emp) =>
    emp.f_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getArrow = (key) => {
    if (sortConfig.key !== key) return '⇅';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const styles = {
    background: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 15s ease infinite',
      overflowY: 'auto',
      fontFamily: 'Arial, sans-serif',
    },
    overlay: {
      padding: '40px',
      maxWidth: '900px',
      margin: '60px auto',
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '12px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
      transform: 'translateZ(0)',
    },
    search: {
      padding: '10px',
      marginBottom: '20px',
      width: '100%',
      borderRadius: '6px',
      border: '1px solid #ccc',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      opacity: fadeIn ? 1 : 0,
      transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.6s ease',
    },
    thTd: {
      border: '1px solid #ccc',
      padding: '10px',
      textAlign: 'left',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    getRowStyle: (index) => ({
      backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
      transition: 'transform 0.3s ease',
    }),
    hoverStyle: {
      backgroundColor: '#e0f7fa',
      transform: 'scale(1.02)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
  };

  return (
    <div style={styles.background}>
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
      <div style={styles.overlay}>
        <h1>Employee Table</h1>
        <input
          type="text"
          placeholder="Search by name or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.search}
        />
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.thTd} onClick={() => sortBy('f_name')}>
                Name {getArrow('f_name')}
              </th>
              <th style={styles.thTd} onClick={() => sortBy('department')}>
                Department {getArrow('department')}
              </th>
              <th style={styles.thTd} onClick={() => sortBy('salary')}>
                Salary {getArrow('salary')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((emp, index) => (
              <tr
                key={index}
                style={styles.getRowStyle(index)}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.hoverStyle)}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.getRowStyle(index))}
              >
                <td style={styles.thTd}>{emp.f_name}</td>
                <td style={styles.thTd}>{emp.department}</td>
                <td style={styles.thTd}>{emp.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

