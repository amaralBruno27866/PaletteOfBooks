/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../Styles/Card.module.css';
import { IoMdBookmarks } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { ConfirmationDialog } from './ConfirmationDialog';

export function Card({ id, title, author, genre, publicationDate, isbn, url, onEdit, onDelete }) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    setShowDeleteConfirmation(false);
    await handleDelete();
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/books/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete();
      } else {
        console.error('Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className={styles.card}>
      <section>
        <header>
          <IoMdBookmarks size={32} />
          <h3>{title}</h3>
        </header>

        <div className={styles.image}>
          <img src={url || 'https://via.placeholder.com/150'} alt={`${title} cover`} />
        </div>
        
        <section className={styles.table}>
          <table>
            <tbody>
              <tr>
                <td className={styles.left}>Author</td>
                <td className={styles.right}>{author}</td>
              </tr>
              <tr>
                <td className={styles.left}>Genre</td>
                <td className={styles.right}>{genre}</td>
              </tr>
              <tr>
                <td className={styles.left}>Published Date</td>
                <td className={styles.right}>{formatDate(publicationDate)}</td>
              </tr>
              <tr>
                <td className={styles.left}>ISBN</td>
                <td className={styles.right}>{isbn}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <div className={styles.edit_bt}>
          <MdEditSquare size={32} className={styles.editIcon} onClick={onEdit} />
          <FaTrashAlt size={32} className={styles.trashIcon} onClick={handleDeleteClick} />
        </div>
      </section>
      {showDeleteConfirmation && (
        <ConfirmationDialog
          message="Are you sure you want to delete this book?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  publicationDate: PropTypes.string.isRequired,
  isbn: PropTypes.string.isRequired,
  url: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

Card.defaultProps = {
  url: 'https://via.placeholder.com/150',
};