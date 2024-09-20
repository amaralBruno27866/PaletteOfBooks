/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from './Table.module.css';
import { EditBookForm } from '../EditBookForm/EditBookForm';
import axios from 'axios';

export function Table({ books, setBooks, onEditBookClick }) {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleEditClick = (book) => {
    onEditBookClick(book);
  };

  const handleDeleteClick = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/books/${bookId}`);
        alert('Book deleted successfully!');
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      } catch (error) {
        console.error('Failed to delete book:', error);
        alert('Failed to delete book. Please try again.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Publication Date</th>
            <th>ISBN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{new Date(book.publication_date).toLocaleDateString()}</td>
              <td>{book.isbn}</td>
              <td>
                <div className={styles.buttons}>
                  <button className={styles.editButton} onClick={() => handleEditClick(book)}>
                    <FaEdit size={24} />
                  </button>
                  <button className={styles.deleteButton} onClick={() => handleDeleteClick(book.id)}>
                    <FaTrash size={24} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}