/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from '../Styles/BooksTable.module.css';
import { Modal } from './Modal';

export function BooksTable({ onSelectBook }) {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch books data from the backend
    axios.get('http://localhost:5000/books')
      .then(response => {
        console.log(response.data); // Check the data
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleRowClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedBook) => {
    // Update the book in the state and close the modal
    setBooks(books.map(book => (book.id === updatedBook.id ? updatedBook : book)));
    handleCloseModal();
  };

  const handleDelete = () => {
    // Delete the book from the state and close the modal
    setBooks(books.filter(book => book.id !== selectedBook.id));
    handleCloseModal();
  };

  return (
    <div className={styles['table-container']}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Published Date</th>
            <th>ISBN</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id} onClick={() => handleRowClick(book)}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{formatDate(book.publication_date)}</td>
              <td>{book.isbn}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedBook && (
        <Modal
          book={selectedBook}
          onClose={handleCloseModal}
          isEditing={isEditing}
          onSave={handleSave}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

BooksTable.propTypes = {
  onSelectBook: PropTypes.func.isRequired,
};