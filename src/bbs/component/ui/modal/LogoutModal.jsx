
// 사이드 바 - 로그아웃 링크 클릭 시 나타나는 모달

import React from 'react';
import '../../style/Modal.css';

import Button from '../button/Button';
import axios from 'axios';
import API_BASE_URL from '../../../utils/api';

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
      // 로그아웃 실패해도 로컬 스토리지 정리
      localStorage.removeItem('userId');
      onConfirm();
    }
  }

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div className="close-icon-container">
          <span onClick={onCancel} className="close-icon">✕</span>
        </div>
        <p style={styles.title}>Logout</p>
        <p style={styles.txtLine}>로그아웃 하시겠습니까?</p>
        <div style={styles.buttonContainer}>
          <Button onClick={onCancel} title="NO"></Button>
          &nbsp;
          <Button onClick={logoutHandler} title="YES"></Button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    background: 'white',
    padding: '20px',
    width: '350px',
    borderRadius: '10px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
  title: {
    fontSize: '20px',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    color:'black',
  },
  txtLine: {
    fontSize: '15px',
    fontFamily: 'NanumSquareL',
    fontWeight: 'bold',
    color:'black',
  }
};

export default LogoutModal;
