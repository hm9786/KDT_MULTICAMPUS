// 사이드바 - 로그아웃 링크 클릭 시 나타나는 모달

import React from 'react';
import '../../style/Modal.css';

import CommonButton from '../button/CommonButton';
import axios from 'axios';
import API_BASE_URL from '../../../../utils/api';

function LogoutModal({ show, onConfirm, onCancel }) {
  if (!show) return null;

  const logoutHandler = async() =>{
    try {
      // 서버에 로그아웃 요청
      await axios.post(`${API_BASE_URL}/users/logout`);
      // 로그아웃 완료 후 상태 업데이트
      localStorage.removeItem('userId');
      onConfirm();

    } catch (e) {
      console.error('로그아웃 오류', e);
      // 로그아웃 실패해도 로컬 스토리지 삭제
      localStorage.removeItem('userId');
      onConfirm();
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="close-icon-container">
          <span onClick={onCancel} className="close-icon">×</span>
        </div>
        <h3 className="modal-title">Logout</h3>
        <p className="modal-text">로그아웃 하시겠습니까?</p>
        <div className="modal-button-container">
          <CommonButton onClick={onCancel} title="NO" variant="primary"></CommonButton>
          <CommonButton onClick={logoutHandler} title="YES" variant="danger"></CommonButton>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
