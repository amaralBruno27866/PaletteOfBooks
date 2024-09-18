/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Styles/ConfirmationDialog.module.css';

export function ConfirmationDialog({ message, onConfirm, onCancel }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <p>{message}</p>
        <div className={styles.actions}>
          <button onClick={onConfirm} className={styles.yes}>Yes</button>
          <button onClick={onCancel} className={styles.no}>No</button>
        </div>
      </div>
    </div>
  );
}

ConfirmationDialog.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};