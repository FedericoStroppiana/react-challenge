import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [numbers, setNumbers] = useState([
    { value: 100, sign: "+", disabled: false },
    { value: 30, sign: "+", disabled: false },
    { value: 7, sign: "-", disabled: false },
  ]);
  const [result, setResult] = useState(123);

  useEffect(() => {
    const result = numbers.reduce((accumulator, currentValue) => {
      if (!currentValue.disabled && currentValue.value) {
        if (currentValue.sign === "+") {
          return accumulator + currentValue.value;
        } else {
          return accumulator - currentValue.value;
        }
      } else return accumulator;
    }, 0);
    setResult(result);
  }, [numbers]);

  return (
    <div className="App">
      <button
        onClick={() => {
          setNumbers([...numbers, { value: 0, sign: "+", disabled: false }]);
        }}
      >
        Add row
      </button>
      <ul>
        {numbers.map((number, index) => (
          <li key={index}>
            <select
              value={number.sign}
              onChange={(e: any) => {
                let tempNumbersCopy = [...numbers];
                tempNumbersCopy[index].sign = e.target.value;
                setNumbers(tempNumbersCopy);
              }}
            >
              <option value="+">+</option>
              <option value="-">-</option>
            </select>
            <input
              type="number"
              value={number.value}
              onChange={(e: any) => {
                let tempNumbersCopy = [...numbers];
                if (e.target.value === "")
                  tempNumbersCopy[index].value = e.target.value;
                else tempNumbersCopy[index].value = parseInt(e.target.value);
                setNumbers(tempNumbersCopy);
              }}
            />
          </li>
        ))}
      </ul>
      <div>{result}</div>
    </div>
  );
}

export default App;
