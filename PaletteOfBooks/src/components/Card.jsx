/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Styles/Card.module.css';
import { IoMdBookmarks } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

export function Card({ title, author, genre, publicationDate, isbn, imageUrl }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className={styles.card}>
      <section>
        <header>
          <IoMdBookmarks size={32} />
          <h3>{title}</h3>
        </header>

        <div className={styles.image}>
          <img src={imageUrl} alt={`${title} cover`} />
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
          <MdEditSquare size={32} className={styles.editIcon} />
          <FaTrashAlt size={32} className={styles.trashIcon} />
        </div>
      </section>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  publicationDate: PropTypes.string.isRequired,
  isbn: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};