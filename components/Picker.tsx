import React, { useState } from 'react';
import styles from '../styles/Picker.module.css';

export default function Picker() {
  const [namesInput, setNamesInput] = useState('');
  const [numberToPick, setNumberToPick] = useState(1);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const pickRandomNames = () => {
    const namesArray = namesInput.split(',').map(name => name.trim()).filter(name => name);
    const randomSelection: string[] = [];

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
    <div className={styles.container}>
      <h1 className={styles.heading}>Random Name Picker</h1>
      
      <div>
        <textarea
          rows={4}
          placeholder="Enter names separated by commas"
          value={namesInput}
          onChange={(e) => setNamesInput(e.target.value)}
          className={styles.textarea}
        />
      </div>

      <label className={styles.label}>Number of names to pick</label>
      <br></br>
      <div>
        <input
          type="number"
          min="1"
          value={numberToPick}
          onChange={(e) => setNumberToPick(Number(e.target.value))}
          className={styles.input}
        />
      </div>
      <br></br>

      <button
        onClick={pickRandomNames}
        className={styles.button}
      >
        Pick Random Names
      </button>

      {selectedNames.length > 0 && (
        <div className={styles.selectedNames}>
          <h3>Selected Names:</h3>
          <p>{selectedNames.join(', ')}</p>
        </div>
      )}
    </div>
  );
}
