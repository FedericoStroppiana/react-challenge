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

  return (
    <div className="App">
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
        {rows.map((number, index) => (
          <li key={index}>
            <select
              value={number.sign}
              // Update row state when sign changes
              onChange={(e: any) => {
                let tempRowsCopy = [...rows];
                tempRowsCopy[index].sign = e.target.value;
                setRows(tempRowsCopy);
              }}
            >
              <option value="+">+</option>
              <option value="-">-</option>
            </select>
            <input
              type="number"
              value={number.value}
              // Update row state when value changes
              onChange={(e: any) => {
                let tempRowsCopy = [...rows];
                tempRowsCopy[index].value = e.target.value;
                setRows(tempRowsCopy);
              }}
            />
            <button
              // Disable row when clicked
              onClick={() => {
                let tempRowsCopy = [...rows];
                tempRowsCopy[index].disabled = !tempRowsCopy[index].disabled;
                setRows(tempRowsCopy);
              }}
            >
              {number.disabled ? "Enable" : "Disable"}
            </button>
            <button
              // Remove row when clicked
              onClick={() => {
                let tempRowsCopy = [...rows];
                tempRowsCopy.splice(index, 1);
                setRows(tempRowsCopy);
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
