import { useState } from 'react';

export default function Home() {
  const [namesInput, setNamesInput] = useState('');
  const [numberToPick, setNumberToPick] = useState(1);
  const [selectedNames, setSelectedNames] = useState([]);

  const pickRandomNames = () => {
    const namesArray = namesInput.split(',').map(name => name.trim()).filter(name => name);
    const randomSelection = [];

    if (numberToPick > namesArray.length) {
      alert("The number to pick exceeds the available names!");
      return;
    }

    while (randomSelection.length < numberToPick) {
      const randomIndex = Math.floor(Math.random() * namesArray.length);
      const name = namesArray[randomIndex];
      if (!randomSelection.includes(name)) {
        randomSelection.push(name);
      }
    }

    setSelectedNames(randomSelection);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Random Name Picker</h1>

      <div>
        <textarea
          rows={4}
          placeholder="Enter names separated by commas"
          value={namesInput}
          onChange={(e) => setNamesInput(e.target.value)}
          style={{ width: '80%', padding: '10px', marginBottom: '10px' }}
        />
      </div>

      <div>
        <input
          type="number"
          min="1"
          value={numberToPick}
          onChange={(e) => setNumberToPick(Number(e.target.value))}
          style={{ padding: '5px', marginBottom: '10px' }}
        />
        <label style={{ marginLeft: '5px' }}>Number of names to pick</label>
      </div>

      <button onClick={pickRandomNames} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Pick Random Names
      </button>

      {selectedNames.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Selected Names:</h3>
          <p>{selectedNames.join(', ')}</p>
        </div>
      )}
    </div>
  );
}
