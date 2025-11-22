import React from 'react';
import '../../style/Modal.css';
import CommonButton from '../button/CommonButton';

function EditImgModal({ show, onDelete, onEdit, onCancel }) {
  if (!show) return null;

  return (
    <div className="edit-img-modal-overlay">
      <div className="edit-img-modal-content">
        <div className="edit-img-modal-close-icon-container">
          <span onClick={onCancel} className="edit-img-modal-close-icon">×</span>
        </div>
        <div className="edit-img-modal-button-container">
          <CommonButton onClick={onEdit} title="이미지 수정하기" variant="primary" />
        </div>
        <div className="edit-img-modal-button-container">
          <CommonButton onClick={onDelete} title="이미지 삭제하기" variant="danger" />
        </div>
      </div>
    </div>
  );
}

export default EditImgModal;
