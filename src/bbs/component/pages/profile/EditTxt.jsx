import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../../utils/api';
import EditInput from '../../ui/input/EditInput';
import '../../style/Profile.css';

function EditTxt({ userId }) {
  const [isEditNickname, setIsEditNickname] = useState(false);
  const [isEditintroduce, setIsEditintroduce] = useState(false);
  const [nickname, setNickname] = useState('nickname');
  const [tempNickname, setTempNickname] = useState('');
  const [introduce, setintroduce] = useState('introduce');
  const [tempintroduce, setTempintroduce] = useState('');

  useEffect(() => {
    console.log('edittxt User ID:', userId);
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}/profile`);
        setNickname(response.data.nickname || ''); 
        setintroduce(response.data.introduce || '');
      } catch (error) {
        console.error('사용자의 데이터를 가져오는 데 실패했습니다:', error);
      }
    };
    fetchUserData();
  }, [userId]);
  

  const editNicknameHandler = () => {
    setTempNickname(nickname);
    setIsEditNickname(true);
  };

  const saveNicknameHandler = async () => {
    if (nickname.trim() === '') {
      alert('닉네임은 빈칸이 될 수 없습니다.');
      return;
    }

    try {
      await axios.put(`${API_BASE_URL}/users/${userId}/nickname`, { nickname });
      setIsEditNickname(false);
    } catch (e) {
      console.error('닉네임 저장 실패:', e);
      alert('닉네임 저장 실패');
    }
  };

  const cancelNicknameHandler = () => {
    setNickname(tempNickname);
    setIsEditNickname(false);
  };//닉네임 취소버튼

  const editintroduceHandler = () => {
    setTempintroduce(introduce);
    setIsEditintroduce(true);
  };

  const saveintroduceHandler = async () => {
    try {
      await axios.put(`${API_BASE_URL}/users/${userId}/introduce`, { introduce });
      setIsEditintroduce(false);
    } catch (e) {
      console.error('자기소개 저장 실패:', e);
      alert('자기소개 저장 실패');
    }
  };

  const cancelintroduceHandler = () => {
    setintroduce(tempintroduce);
    setIsEditintroduce(false);
  };

  return (
    <div className="edit-txt-container">
      {/* 닉네임 */}
      <div className="edit-txt-main">
        <div className="edit-txt-input">
          {isEditNickname ? (
            <div>
              <EditInput
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                maxLength={20}
              />
            </div>
          ) : (
            <span className="edit-txt-display-nickname">{nickname}</span>
          )}
        </div>
        <div className="edit-txt-button">
          {isEditNickname ? (
            <div className="edit-txt-button-container">
              <img
                src={process.env.PUBLIC_URL + '/img/button/check.png'}
                alt="저장"
                className="edit-txt-save-button"
                onClick={saveNicknameHandler}
              />
              <img
                src={process.env.PUBLIC_URL + '/img/button/cross.png'}                
                alt="취소"
                className="edit-txt-cancel-button"
                onClick={cancelNicknameHandler}
              />
            </div>
          ) : (
            <div>
              <img
                src={process.env.PUBLIC_URL + '/img/button/edit.png'}
                alt="수정"
                className="edit-txt-edit-button"
                onClick={editNicknameHandler}
              />
            </div>
          )}
        </div>
      </div>

      {/* 자기소개 */}
      <div className="edit-txt-main">
        <div className="edit-txt-input">
          {isEditintroduce ? (
            <div>
              <EditInput
                type="text"
                value={introduce}
                onChange={(e) => setintroduce(e.target.value)}
                maxLength={50}
              />
            </div>
          ) : (
            <span className="edit-txt-display-bio">{introduce}</span>
          )}
        </div>
        <div className="edit-txt-button">
          {isEditintroduce ? (
            <div className="edit-txt-button-container">
              <img
                src={process.env.PUBLIC_URL + '/img/button/check.png'}
                alt="저장"
                className="edit-txt-save-button"
                onClick={saveintroduceHandler}
              />
              <img
                src={process.env.PUBLIC_URL + '/img/button/cross.png'}
                alt="취소"
                className="edit-txt-cancel-button"
                onClick={cancelintroduceHandler}
              />
            </div>
          ) : (
            <div>
              <img
                src={process.env.PUBLIC_URL + '/img/button/edit.png'}
                alt="수정"
                className="edit-txt-edit-button"
                onClick={editintroduceHandler}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditTxt;
