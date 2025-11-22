
// ?�이??�?- ?�원 ?�퇴 ?�릭 ???�는 모달

import React from 'react';
import '../../style/Modal.css';

import Button from '../button/Button';

function DeleteUserModal({ show, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div className="close-icon-container">
          <span onClick={onCancel} className="close-icon">×</span>
        </div>
        <p style={styles.title}>?�말�??�퇴?�시겠습?�까?</p>
        <p style={styles.txtLine}>??�??�퇴??계정?� ?�시 복구?????�습?�다.</p>
        <div style={styles.buttonContainer}>
          <Button onClick={onCancel} title="취소"></Button>
          &nbsp;
          <Button onClick={onConfirm} title="?�퇴"></Button>
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
    zIndex:'1000'
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
    fontFamily: 'nanumsquarer',
    fontWeight: 'bold',
  },
  txtLine: {
    fontSize: '15px',
    fontFamily: 'nanumsquarer',
  },

};

export default DeleteUserModal;
