import React from 'react';
import styles from '../styles/Picker.module.css';

interface HistoryModalProps {
  isOpen: boolean;
  history: string[];
  toggleModal: () => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, history, toggleModal }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={toggleModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3>Selection History</h3>
        {history.length > 0 ? (
          <ul>
            {history.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        ) : (
          <p>No history available.</p>
        )}
        <button onClick={toggleModal} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default HistoryModal;
