import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // Rows state
  const [rows, setRows] = useState([
    { value: 100, sign: "+", disabled: false },
    { value: 30, sign: "+", disabled: false },
    { value: 7, sign: "-", disabled: false },
  ]);

  // Result state
  const [result, setResult] = useState(123);

  // useEffect to update result when rows change
  useEffect(() => {
    const result = rows.reduce((accumulator, currentValue) => {
      if (!currentValue.disabled && currentValue.value) {
        if (currentValue.sign === "+") {
          return accumulator + +currentValue.value;
        } else {
          return accumulator - +currentValue.value;
        }
      } else return accumulator;
    }, 0);
    setResult(result);
  }, [rows]);

  // Update row state when sign changes
  const handleSignChange = (e: any, index: number) => {
    let tempRowsCopy = [...rows];
    tempRowsCopy[index].sign = e.target.value;
    setRows(tempRowsCopy);
  };

  // Update row state when value changes
  const handleValueChange = (e: any, index: number) => {
    let tempRowsCopy = [...rows];
    tempRowsCopy[index].value = e.target.value;
    setRows(tempRowsCopy);
  };

  // Disable row when clicked
  const handleDisableClick = (index: number) => {
    let tempRowsCopy = [...rows];
    tempRowsCopy[index].disabled = !tempRowsCopy[index].disabled;
    setRows(tempRowsCopy);
  };

  // Remove row when clicked
  const handleDeleteClick = (index: number) => {
    let tempRowsCopy = [...rows];
    tempRowsCopy.splice(index, 1);
    setRows(tempRowsCopy);
  };

  return (
    <div className="App">
      <h1>React Challenge - Federico Luciano Stroppiana</h1>
      <button
        onClick={() => {
          // Add new row
          setRows([...rows, { value: 0, sign: "+", disabled: false }]);
        }}
      >
        Add row
      </button>
      <ul>
        {/* Print rows */}
        {rows.map((row, index) => (
          <li key={index}>
            <select
              value={row.sign}
              // Update row state when sign changes
              onChange={(e) => {
                handleSignChange(e, index);
              }}
            >
              <option value="+">+</option>
              <option value="-">-</option>
            </select>
            <input
              type="number"
              value={row.value}
              // Update row state when value changes
              onChange={(e) => {
                handleValueChange(e, index);
              }}
            />
            <button
              // Disable row when clicked
              onClick={() => {
                handleDisableClick(index);
              }}
            >
              {row.disabled ? "Enable" : "Disable"}
            </button>
            <button
              // Remove row when clicked
              onClick={() => {
                handleDeleteClick(index);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {/* Print result */}
      <div>{result}</div>
    </div>
  );
}

export default App;
