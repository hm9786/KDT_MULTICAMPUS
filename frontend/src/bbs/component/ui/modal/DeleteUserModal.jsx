// 사이드바 - 회원 탈퇴 클릭 시 나타나는 모달

import React from 'react';
import '../../style/Modal.css';

import CommonButton from '../button/CommonButton';

function DeleteUserModal({ show, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="close-icon-container">
          <span onClick={onCancel} className="close-icon">×</span>
        </div>
        <h3 className="modal-title">정말 탈퇴하시겠습니까?</h3>
        <p className="modal-text">한번 탈퇴한 계정은 다시 복구할 수 없습니다.</p>
        <div className="modal-button-container">
          <CommonButton onClick={onCancel} title="취소" variant="primary"></CommonButton>
          <CommonButton onClick={onConfirm} title="탈퇴" variant="danger"></CommonButton>
        </div>
      </div>
    </div>
  );
}

export default DeleteUserModal;
