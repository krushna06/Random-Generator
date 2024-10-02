import React, { useState, useEffect } from 'react';
import styles from '../styles/Picker.module.css';
import HistoryModal from '../components/HistoryModal';
import ImportModal from '../components/ImportModal';

export default function Picker() {
  const [namesInput, setNamesInput] = useState('');
  const [numberToPick, setNumberToPick] = useState(1);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  useEffect(() => {
    const storedHistory = localStorage.getItem('namesHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

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
    const updatedHistory = [...history, randomSelection.join(', ')];
    setHistory(updatedHistory);
    localStorage.setItem('namesHistory', JSON.stringify(updatedHistory));
  };

  const toggleHistoryModal = () => {
    setIsHistoryModalOpen(!isHistoryModalOpen);
  };

  const toggleImportModal = () => {
    setIsImportModalOpen(!isImportModalOpen);
  };

  const handleImport = (importedNames: string) => {
    setNamesInput(prevNames => `${prevNames}${prevNames ? ', ' : ''}${importedNames}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Random Name Picker</h1>

      <div className={styles.buttonContainer}>
        <button className={styles.historyButton} onClick={toggleHistoryModal}>
          Show History
        </button>

        <button className={styles.importButton} onClick={toggleImportModal}>
          Import Names
        </button>
      </div>

      <div className={styles.inputWrapper}>
        <textarea
          rows={4}
          placeholder="Enter names separated by commas"
          value={namesInput}
          onChange={(e) => setNamesInput(e.target.value)}
          className={styles.textarea}
        />

        <label className={styles.label}>Number of names to pick</label>
        <div className={styles.numberInputWrapper}>
          <input
            type="number"
            min="1"
            value={numberToPick}
            onChange={(e) => setNumberToPick(Number(e.target.value))}
            className={styles.input}
          />
        </div>
      </div>

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

      <HistoryModal isOpen={isHistoryModalOpen} history={history} toggleModal={toggleHistoryModal} />
      <ImportModal isOpen={isImportModalOpen} onImport={handleImport} toggleModal={toggleImportModal} />
    </div>
  );

}
