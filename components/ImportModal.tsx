import React, { useState } from 'react';
import styles from '../styles/Picker.module.css';

interface ImportModalProps {
  isOpen: boolean;
  onImport: (importedNames: string) => void;
  toggleModal: () => void;
}

const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onImport, toggleModal }) => {
  const [fileContent, setFileContent] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setFileContent(text);
      };
      reader.readAsText(file);
    }
  };

  const handleImport = () => {
    if (fileContent) {
      // Clean up the imported names: remove empty lines and trim spaces
      const importedNames = fileContent
        .split(/[\r\n,]+/) // Split by newlines or commas
        .map(name => name.trim()) // Trim spaces
        .filter(name => name); // Remove empty names
      onImport(importedNames.join(', ')); // Pass the names back to the parent component
      toggleModal(); // Close the modal
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={toggleModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3>Import Names from .txt File</h3>
        <input
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          className={styles.fileInput}
        />
        {fileContent && (
          <div className={styles.filePreview}>
            <h4>Preview:</h4>
            <pre>{fileContent}</pre>
          </div>
        )}
        <button onClick={handleImport} className={styles.button} disabled={!fileContent}>
          Import Names
        </button>
        <button onClick={toggleModal} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ImportModal;
