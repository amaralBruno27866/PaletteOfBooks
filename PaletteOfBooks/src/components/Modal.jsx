/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Styles/Modal.module.css';
import { IoMdCloseCircle } from "react-icons/io";
import { Card } from './Card';

export function Modal({ book, onClose }) {
  if (!book) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <Card {...book} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  book: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};


