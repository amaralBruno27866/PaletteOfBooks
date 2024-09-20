/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from "./components/Header/Header";
import { Table } from "./components/Table/Table";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { AddBookForm } from './components/AddBookForm/AddBookForm';
import { EditBookForm } from './components/EditBookForm/EditBookForm';
import styles from './App.module.css';
import './global.css';

export function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const [showEditBookForm, setShowEditBookForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // Function to fetch books from the backend
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/books');
      setBooks(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch books:', err);
      setError('Failed to fetch books');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearchResults = (results) => {
    setBooks(results);
  };

  const handleAddBookClick = () => {
    setShowAddBookForm(true);
  };

  const handleEditBookClick = (book) => {
    setSelectedBook(book);
    setShowEditBookForm(true);
  };

  const handleCloseForm = () => {
    setShowAddBookForm(false);
    setShowEditBookForm(false);
    setSelectedBook(null);
  };

  return (
    <div>
      <Header onRefresh={fetchBooks} />
      <Navbar onSearch={handleSearchResults} onAddBookClick={handleAddBookClick} />
      <div className={styles.form}>
        {showAddBookForm && <AddBookForm onClose={handleCloseForm} />}
        {showEditBookForm && <EditBookForm book={selectedBook} onClose={handleCloseForm} />}
      </div>
      {loading ? (
        <p>Loading books...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Table books={books} setBooks={setBooks} onEditBookClick={handleEditBookClick} />
      )}
      <Footer />
    </div>
  );
}