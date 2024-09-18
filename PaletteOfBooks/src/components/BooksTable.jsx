import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from '../Styles/BooksTable.module.css';

export function BooksTable({ onSelectBook }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books data from the backend
    axios.get('http://localhost:5000/books')
      .then(response => {
        console.log(response.data); // Check the data
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error); // ERROR ON THIS LINE
      });
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
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
            <tr key={book.id} onClick={() => onSelectBook(book)}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{formatDate(book.publication_date)}</td>
              <td>{book.isbn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

BooksTable.propTypes = {
  onSelectBook: PropTypes.func.isRequired,
};