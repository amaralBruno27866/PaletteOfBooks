/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styles from '../Styles/Navbar.module.css';
import { FaList, FaFileDownload } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";

export function Navbar({ onAddBook, books }){
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState('');

  const handleAddBook = () => {
    setIsAdding(true);
  };

  const handleSave = (newBook) => {
    // Handle saving the new book
    onAddBook(newBook);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  const handleSearch = () => {
    const results = books.filter(book =>
      (book.title && book.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (book.author && book.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (book.genre && book.genre.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (book.publishedDate && book.publishedDate.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (results.length > 0) {
      setSearchResults(results);
      setMessage('Search successful!');
    } else {
      setSearchResults([]);
      setMessage('No results found.');
    }

    setTimeout(() => {
      setMessage('');
    }, 1000);
  };

  const convertToCSV = (books) => {
    const headers = ['Title', 'Author', 'Year'];
    const rows = books.map(book => [book.title, book.author, book.year]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });

    return encodeURI(csvContent);
  };

  const handleDownloadCSV = () => {
    if (!books || books.length === 0) {
      console.error('No books available to download');
      return;
    }
    const csvContent = convertToCSV(books);
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', 'bookpalette.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadJSON = () => {
    if (!books || books.length === 0) {
      console.error('No books available to download');
      return;
    }
    const jsonContent = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(books, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', jsonContent);
    link.setAttribute('download', 'bookpalette.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return(
    <div className={styles.nav}>
      <nav>
        <button onClick={handleAddBook}>
          Add book
          <div><IoMdAddCircle size={24} /></div>
        </button>

        <input
          type="text"
          placeholder='Search'
          className={styles.input}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        <FaList size={48} className={styles.filter} />

        <button onClick={handleDownloadCSV}>
          CSV
          <div><FaFileDownload size={24} /></div>
        </button>

        <button onClick={handleDownloadJSON}>
          JSON
          <div><FaFileDownload size={24} /></div>
        </button>
      </nav>

      {message && <div className={styles.message}>{message}</div>}

      {searchResults.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Published Date</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((book, index) => (
              <tr key={index}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.publishedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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
  )
}