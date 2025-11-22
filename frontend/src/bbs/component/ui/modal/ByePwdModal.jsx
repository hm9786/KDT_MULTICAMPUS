// 사이드바 - 회원 탈퇴 -  비밀 번호 입력 확인하는 모달
import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../../../utils/api';
import '../../style/Modal.css';
import CommonButton from '../button/CommonButton';
import PwdInput from '../input/PwdInput';

function ByePwdModal({ show, onConfirm, onCancel, userid }) {
  const [pwd, setPwd] = useState(''); // 비밀번호 상태 관리

  // 비밀번호 핸들러
  const pwdHandler = async () => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/users/delete-account`, {
        data: { 
          // DELETE 요청에서 필요한 data 필드를 넣어 전송
          // 사용자의 아이디와 비밀 번호를 넣기로 당시에 있는 백앤드에게 전달하기로 한다
          userId: userid,
          password: pwd,
        },
      });

      if (response.data.success) {
        onConfirm(); // 성공 시 모달 닫기 처리
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
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="close-icon-container">
          <span onClick={onCancel} className="close-icon">×</span>
        </div>
        <h3 className="modal-title">Password</h3>
        <p className="modal-text">탈퇴하기 위해 비밀번호가 필요합니다.</p>
        <PwdInput 
          placeholder="비밀번호" 
          value={pwd} 
          onChange={(e) => setPwd(e.target.value)}
        />
        <div className="modal-button-container">
          <CommonButton onClick={pwdHandler}
                  title="입력" variant="danger"></CommonButton>
        </div>
      </div>
    </div>
  );
}

export default ByePwdModal;
