// 사이드바 - 회원 탈퇴 -  비밀 번호 입력 시 나타나는 모달
import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../../utils/api';
import '../../style/Modal.css';
import Button from '../button/Button';
import PwdInput from '../input/PwdInput';

function ByePwdModal({ show, onConfirm, onCancel, userid }) {
  const [pwd, setPwd] = useState(''); // 비밀번호 상태 관리

  // 비밀번호 핸들러
  const pwdHandler = async () => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/users/delete-account`, {
        data: { 
          // DELETE 요청에서 데이터는 data 필드에 넣어 전송
          // 사용자 아이디와 비밀 번호만 넘기면 해당하는 데이터는 백앤드에서 삭제하도록 한다
          userId: userid,
          password: pwd,
        },
      });

      if (response.data.success) {
        onConfirm(); // 성공 시 모달 닫기 또는 처리
        alert('계정이 성공적으로 삭제되었습니다.');
      } else {
        alert('비밀번호가 일치하지 않습니다.');
      }
    } catch (e) {
      console.error('계정 삭제 오류: ', e);
      alert('계정 삭제 중 오류가 발생했습니다.');
      alert(pwd) //확인용
    }
  };

  if (!show) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div className="close-icon-container">
          <span onClick={onCancel} className="close-icon">✕</span>
        </div>
        <p style={styles.title}>Password</p>
        <p style={styles.txtLine}>탈퇴를 위해선 비밀번호가 필요합니다</p>
        <PwdInput 
          placeholder="비밀번호" 
          value={pwd} 
          onChange={(e) => setPwd(e.target.value)} // 비밀번호 상태 업데이트
        />
        <div style={styles.buttonContainer}>
          <Button onClick={pwdHandler} // onConfirm 대신 pwdHandler 호출
                  title="입력"></Button>
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
    padding: '20px',
    width: '400px',
    borderRadius: '10px',
    background:'white' // 모달 배경색
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
  }
};

export default ByePwdModal;
