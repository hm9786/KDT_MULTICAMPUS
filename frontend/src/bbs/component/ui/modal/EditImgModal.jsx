import React from 'react';
import '../../style/Modal.css';
import HomeButton from '../button/HomeButton';

function EditImgModal({ show, onDelete, onEdit, onCancel }) {
  if (!show) return null;

  return (
    <div className="edit-img-modal-overlay">
      <div className="edit-img-modal-content">
        <div className="edit-img-modal-close-icon-container">
          <span onClick={onCancel} className="edit-img-modal-close-icon">×</span>
        </div>
        <div className="edit-img-modal-button-container">
          <HomeButton onClick={onEdit} title="?��?지 ?�정?�기" />
        </div>
        <div className="edit-img-modal-button-container">
          <HomeButton onClick={onDelete} title="?��?지 ??��?�기" />
        </div>
      </div>
    </div>
  );
}

export default EditImgModal;
