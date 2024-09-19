/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../Styles/EditForm.module.css';

export function EditForm({ book, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    genre: book.genre,
    publicationDate: book.publication_date || '',
    isbn: book.isbn,
    imageUrl: book.image_url || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert date format to YYYY-MM-DD
    const formattedDate = new Date(formData.publicationDate).toISOString().split('T')[0];

    const updatedFormData = {
      ...formData,
      publicationDate: formattedDate,
    };

    try {
      const response = await fetch(`http://localhost:5000/books/${book.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        const updatedBook = await response.json();
        onSave(updatedBook);
      } else {
        console.error('Failed to update book');
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <form className={styles.editForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="genre">Genre</label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="publicationDate">Published Date</label>
        <input
          type="date"
          id="publicationDate"
          name="publicationDate"
          value={formData.publicationDate}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="isbn">ISBN</label>
        <input
          type="text"
          id="isbn"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formActions}>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

EditForm.propTypes = {
  book: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

EditForm.defaultProps = {
  imageUrl: 'https://mymaterialforwebapps.blogspot.com/2024/09/blog-post_18.html',
};