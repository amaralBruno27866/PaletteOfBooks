/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { IoCloseCircle, IoSave } from "react-icons/io5";
import { TiCancel } from "react-icons/ti";
import styles from './EditBookForm.module.css';
import axios from 'axios';

export function EditBookForm({ book, onClose }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [isbn, setIsbn] = useState('');
  const [genre, setGenre] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setPublicationDate(book.publication_date);
      setIsbn(book.isbn);
      setGenre(book.genre);
    }
  }, [book]);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setHasUnsavedChanges(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    if (!title || !author || !publicationDate || !isbn || !genre) {
      alert('All fields are required.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (publicationDate > today) {
      alert('Publication date cannot be in the future.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/books/${book.id}`, {
        title,
        author,
        genre,
        publication_date: publicationDate,
        isbn,
      });
      console.log('Book updated:', response.data);
      alert('Book updated successfully!');
      setHasUnsavedChanges(false);
      onClose(); // Close the form after submission
    } catch (error) {
      console.error('Failed to update book:', error);
      alert('Failed to update book. Please try again.');
    }
  };

  const handleCancel = () => {
    if (hasUnsavedChanges && !window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
      return;
    }
    onClose();
  };

  const handleFormClose = () => {
    if (hasUnsavedChanges && !window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
      return;
    }
    onClose();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.title}>
          <h3>Edit Book Form</h3>
          <button type="button" className={styles.close_bt} onClick={handleFormClose}>
            <IoCloseCircle size={32} />
          </button>
        </div>
        <div className={styles.content}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Book title"
            value={title}
            onChange={handleInputChange(setTitle)}
            required
          />
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Author name"
            value={author}
            onChange={handleInputChange(setAuthor)}
            required
          />
          <label htmlFor="publication_date">Publication Date</label>
          <input
            type="date"
            id="publication_date"
            name="publication_date"
            value={publicationDate}
            onChange={handleInputChange(setPublicationDate)}
            required
          />
          <label htmlFor="isbn">ISBN</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            placeholder="ISBN"
            value={isbn}
            onChange={handleInputChange(setIsbn)}
            required
          />
          <label htmlFor="genre">Genre</label>
          <select
            id="genre"
            name="genre"
            value={genre}
            onChange={handleInputChange(setGenre)}
            required
          >
            <option value="">Select a genre</option>
            {[
              'Romance',
              'Mystery',
              'Fantasy',
              'Fiction',
              'Adult',
              'Horror',
              'Historical',
              'Biography',
              'Classic',
              'Children',
              'Dystopian',
              'Adventure',
              'Contemporary',
              'Magical Realism',
            ].map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.buttons_save_cancel}>
          <button type="submit" className={styles.save_bt}>
            <IoSave size={48} />
          </button>
          <button type="button" className={styles.cancel_bt} onClick={handleCancel}>
            <TiCancel size={48} />
          </button>
        </div>
      </form>
    </div>
  );
}