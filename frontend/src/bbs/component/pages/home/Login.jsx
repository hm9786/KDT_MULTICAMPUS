import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../../../utils/api";
import HomeInput from "../../ui/input/HomeInput";
import PwdInput from "../../ui/input/PwdInput";
import CommonButton from "../../ui/button/CommonButton";
import "../../style/Auth.css";

function Login() {
  const navigate = useNavigate();

  const [userid, setUserId] = useState('');   // 아이디
  const [pwd, setPwd] = useState('');         // 비밀 번호
  const [useridError, setUserIdError] = useState(''); // 아이디 오류 메시지
  const [pwdError, setPwdError] = useState('');       // 비밀번호 오류 메시지

  const loginHandler = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지

    setUserIdError(''); // 오류 메시지 초기화
    setPwdError('');    // 오류 메시지 초기화

    // 입력 필드가 비어있는 경우 오류 메시지 설정
    if (!userid) {
      setUserIdError("아이디를 입력해주세요.");
      return;
    }

    if (!pwd) {
      setPwdError("비밀번호를 입력해주세요.");
      return;
    }

    // 모든 필드가 유효하면 서버 요청
    if (userid && pwd) {
      const loginData = { userId: userid, password: pwd }; // 데이터 이름 설정

      try {
        const response = await axios.post(`${API_BASE_URL}/users/login`, loginData);
        const data = response.data;

        if (response.status === 200 && data.message === "로그인 성공") {
          localStorage.setItem('userId', data.userUN.toString());    // userId를 localStorage에 저장
          navigate(`/calendar/${data.userUN}`);           // 해당 사용자 페이지로 이동
        } else {
          alert(data.message || '로그인에 실패했습니다.');  // 오류 메시지 처리
        }
      } catch (error) {
        console.error('Error:', error);
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert('로그인 중 오류가 발생했습니다.');
        }
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>

        <form onSubmit={loginHandler}>
          <div className="auth-input-group">
            <HomeInput
              placeholder="ID"
              value={userid}
              onChange={(e) => setUserId(e.target.value)}
              autoComplete="username"
            />
            {useridError && (
              <div className="auth-error">
                {useridError}
              </div>
            )}
          </div>

          <div className="auth-input-group">
            <PwdInput
              placeholder="PASSWORD"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              autoComplete="current-password"
            />
            {pwdError && (
              <div className="auth-error">
                {pwdError}
              </div>
            )}
          </div>

          <div className="auth-button-group">
            <CommonButton type="submit" title="로그인" fullWidth={true} />
          </div>
        </form>

        <div className="auth-footer">
          회원가입이 필요하신가요? &nbsp; {' | '} &nbsp;
          <span className="auth-link" onClick={() => navigate('/signup')}>
            회원가입
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
