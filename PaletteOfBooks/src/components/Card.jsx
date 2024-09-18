/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../Styles/Card.module.css';
import { IoMdBookmarks } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { ConfirmationDialog } from './ConfirmationDialog';

export function Card({ title, author, genre, publicationDate, isbn, imageUrl, onEdit, onDelete }) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteConfirmation(false);
    onDelete();
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div className={styles.card}>
      <section>
        <header>
          <IoMdBookmarks size={32} />
          <h3>{title}</h3>
        </header>

        <div className={styles.image}>
          <img src={imageUrl || 'default-image-url.jpg'} alt={`${title} cover`} />
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
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  publicationDate: PropTypes.string.isRequired,
  isbn: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

Card.defaultProps = {
  imageUrl: 'https://mymaterialforwebapps.blogspot.com/2024/09/blog-post_18.html',
};
