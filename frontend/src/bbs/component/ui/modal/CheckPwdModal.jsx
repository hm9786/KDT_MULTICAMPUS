// 사이드바 - 비밀 번호 설정 클릭 시 나타나는 모달

import React, { useState } from 'react';
import '../../style/Modal.css';
 
import Button from '../button/Button';
import PwdInput from '../input/PwdInput';
import axios from 'axios';
import API_BASE_URL from '../../../../utils/api';

function CheckPwdModal({ show, onConfirm, onCancel, userid }) {
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');

  // 모달이 보여지는지 확인하고, 그에 따라 리턴
  if (!show) return null;

  const changeHandler = (e) => {
    setPwd(e.target.value);
    setError(''); // 입력하면 오류 메시지 초기화
  };

  const confirmHandler = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/check-password`, 
        {
          userId: userid, // 사용자ID를 포함
          password: pwd, // 입력한 비밀번호
        }
      );

      if (response.data.success) {
        onConfirm(); // 비밀번호가 일치하면 onConfirm 호출
      } else {
        setError('비밀번호가 일치하지 않습니다.'); // 오류 메시지 설정
      }
      
    } catch (e) {
      console.error('비밀번호 확인 오류', e);
      alert('서버 오류로 비밀번호 확인에 실패했습니다.'); // 서버 오류 처리
      alert(pwd) // 확인용
    }
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div className="close-icon-container">
          <span onClick={onCancel} className="close-icon">×</span>
        </div>
        <p style={styles.title}>Password</p>
        <p style={styles.txtLine}>비밀 번호를 입력해주세요.</p>
        <PwdInput 
          onChange={changeHandler}
          placeholder="비밀번호"
          value={pwd} // 비밀번호 입력값 설정
        />
        {error && <p style={styles.error}>{error}</p>} {/* 오류 메시지 표시 */}
        <div style={styles.buttonContainer}>
          <Button onClick={confirmHandler} title="입력"></Button>
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
    zIndex:'4'
  },
  modalContent: {
    background: 'white',
    padding: '20px',
    width: '400px',
    borderRadius: '10px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
  title: {
    fontSize: '10px',
    fontFamily: 'montserrat',
    fontWeight: 'bold',
  },
  txtLine: {
    fontSize: '15px',
    fontFamily: 'NanumSquareL',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: '12px',
    marginTop: '10px',
  }
};

export default CheckPwdModal;
