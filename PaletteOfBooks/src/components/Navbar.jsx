import React, { useState } from 'react';
import styles from '../Styles/Navbar.module.css';
import { FaList, FaFileDownload } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { Modal } from './Modal';

export function Navbar() {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddBook = () => {
    setIsAdding(true);
  };

  const handleSave = (newBook) => {
    // Handle saving the new book
    console.log('New book saved:', newBook);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  return (
    <div className={styles.nav}>
      <nav>
        <button onClick={handleAddBook}>
          Add book
          <div><IoMdAddCircle size={24} /></div>
        </button>

        <input type="text" placeholder='Search' className={styles.input} />

        <FaList size={48} className={styles.filter} />

        <button>
          CSV
          <div><FaFileDownload size={24} /></div>
        </button>

        <button>
          JSON
          <div><FaFileDownload size={24} /></div>
        </button>
      </nav>

      {isAdding && (
        <Modal
          book={null}
          onClose={handleCancel}
          isEditing={true}
          onSave={handleSave}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      )}
    </div>
  );
}