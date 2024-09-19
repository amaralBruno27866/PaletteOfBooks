import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../Styles/Modal.module.css';
import { Card } from './Card';
import { EditForm } from './EditForm';
import { ConfirmationDialog } from './ConfirmationDialog';

export function Modal({ book, onClose, isEditing, onSave, onEdit, onDelete }) {
  const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      if (isEditing) {
        setShowLeaveConfirmation(true);
      } else {
        onClose();
      }
    }
  };

  const handleConfirmLeave = () => {
    setShowLeaveConfirmation(false);
    onClose();
  };

  const handleCancelLeave = () => {
    setShowLeaveConfirmation(false);
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {isEditing || !book ? (
          <EditForm book={book} onSave={onSave} onCancel={onClose} />
        ) : (
          <Card {...book} onEdit={onEdit} onDelete={onDelete} />
        )}
      </div>
      {showLeaveConfirmation && (
        <ConfirmationDialog
          message="You have unsaved changes. Do you really want to leave without saving?"
          onConfirm={handleConfirmLeave}
          onCancel={handleCancelLeave}
        />
      )}
    </div>
  );
}

Modal.propTypes = {
  book: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};