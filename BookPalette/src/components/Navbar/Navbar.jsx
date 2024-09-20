/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { IoMdAddCircle } from "react-icons/io";
import { FaFileDownload } from "react-icons/fa";
import styles from './Navbar.module.css';

export function Navbar({ onSearch, onAddBookClick }) {
  const [searchQuery, setSearchQuery] = useState('');

  const downloadFile = async (url, filename) => {
    try {
      const response = await fetch(`http://localhost:5000${url}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleDownloadCSV = () => {
    downloadFile('/books/export/csv', 'books.csv');
  };

  const handleDownloadJSON = () => {
    downloadFile('/books/export/json', 'books.json');
  };

  const handleSearch = async () => {
    const query = searchQuery.toLowerCase();
    try {
      const response = await fetch(`http://localhost:5000/books/search?query=${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      onSearch(result); // Pass the search results to the parent component
    } catch (error) {
      console.error('Error searching books:', error);
      alert('Failed to search books');
    }
  };

  return (
    <div className={styles.nav}>
      <nav>
        <button onClick={onAddBookClick}>
          Add Book
          <div>
            <IoMdAddCircle size={24} />
          </div>
        </button>

        <input 
          type='text' 
          placeholder='Search'
          className={styles.input}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        <button onClick={handleDownloadCSV}>
          CSV
          <div><FaFileDownload size={24} /></div>
        </button>

        <button onClick={handleDownloadJSON}>
          JSON
          <div><FaFileDownload size={24} /></div>
        </button>
      </nav>
    </div>
  );
}