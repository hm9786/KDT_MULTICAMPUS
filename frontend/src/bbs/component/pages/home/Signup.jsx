import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../../../utils/api";
import HomeInput from "../../ui/input/HomeInput";
import PwdInput from "../../ui/input/PwdInput";
import CommonButton from "../../ui/button/CommonButton";
import "../../style/Auth.css";

function Signup() {
  const navigate = useNavigate();

  // 이름, 아이디, 닉네임, 비밀번호, 비밀번호 확인
  const [name, setName] = useState('');
  const [userid, setUserId] = useState('');
  const [nickname, setNickname] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdConfirm, setPwdConfirm] = useState('');

  // 오류 메세지
  const [nameError, setNameError] = useState('');
  const [useridError, setUserIdError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [pwdConfirmError, setPwdConfirmError] = useState('');
  const [useridTakenError, setUserIdTakenError] = useState('');
  const [isCheckingUserId, setIsCheckingUserId] = useState(false);

  // 최소 8자, 영문자, 대문자, 숫자 문자(?/~!@#$%^&*)를 포함하는지 검사
  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[?/~!@#$%^&*])[a-zA-Z\d?/~!@#$%^&*]{8,}$/.test(password);
  };

  const checkUserIdExists = async (userid) => {
    if (!userid || userid.trim() === '') {
      return false;
    }
    try {
      setIsCheckingUserId(true);
      const url = `${API_BASE_URL}/users/checkUserId`;
      console.log('Checking user ID, API URL:', url);
      const response = await axios.post(url, { user_id: userid });
      return response.data.exists; // exists가 true면 아이디가 이미 사용 중인 것
    } catch (error) {
      console.error('Error checking user ID:', error);
      if (error.response && error.response.status === 404) {
        console.error(`API endpoint not found: ${API_BASE_URL}/users/checkUserId`);
        console.error('API_BASE_URL value:', API_BASE_URL);
        console.error('Check if backend is running on the correct port.');
      }
      return false; // 오류 발생 시 사용 중이 아닌 것으로 간주
    } finally {
      setIsCheckingUserId(false);
    }
  };

  // 아이디 입력 시 실시간 중복 체크
  const handleUserIdChange = async (e) => {
    const newUserId = e.target.value;
    setUserId(newUserId);
    setUserIdError('');
    setUserIdTakenError('');

    if (newUserId.trim() === '') {
      return;
    }

    // 아이디 형식 검사 (영문, 숫자, 4-20자)
    const userIdPattern = /^[a-zA-Z0-9]{4,20}$/;
    if (!userIdPattern.test(newUserId)) {
      setUserIdError('아이디는 영문, 숫자만 사용 가능하며 4-20자여야 합니다.');
      return;
    }

    // 중복 체크
    const exists = await checkUserIdExists(newUserId);
    if (exists) {
      setUserIdTakenError('이미 사용 중인 아이디입니다.');
    }
  };

  // 비밀번호 확인 검사
  const handlePwdConfirmChange = (e) => {
    const confirmValue = e.target.value;
    setPwdConfirm(confirmValue);
    setPwdConfirmError('');

    if (confirmValue && confirmValue !== pwd) {
      setPwdConfirmError('비밀번호가 일치하지 않습니다.');
    }
  };

  // 비밀번호 변경 시 확인란도 다시 검사
  const handlePwdChange = (e) => {
    const newPwd = e.target.value;
    setPwd(newPwd);
    setPwdError('');

    if (pwdConfirm && newPwd !== pwdConfirm) {
      setPwdConfirmError('비밀번호가 일치하지 않습니다.');
    } else if (pwdConfirm) {
      setPwdConfirmError('');
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지

    // 오류 메시지 초기화
    setNameError('');
    setUserIdError('');
    setNicknameError('');
    setPwdError('');
    setPwdConfirmError('');
    setUserIdTakenError('');

    // 입력 필드가 비어있는 경우 오류 메시지 설정
    if (!name) {
      setNameError("이름을 입력해주세요.");
      return;
    }

    if (!nickname) {
      setNicknameError("닉네임을 입력해주세요.");
      return;
    }

    if (!userid) {
      setUserIdError("아이디를 입력해주세요.");
      return;
    }

    if (!pwd) {
      setPwdError("비밀번호를 입력해주세요.");
      return;
    }

    // 비밀번호 유효성 검사
    if (!validatePassword(pwd)) {
      setPwdError(
        <>
          최소8자 이상, 영문/대문자/ 숫자/ 특수문자를 포함해주세요.<br />
          특수 문자: &nbsp; ?/~!@#$%^&*
        </>
      );
      return;
    }

    if (!pwdConfirm) {
      setPwdConfirmError("비밀번호 확인을 입력해주세요.");
      return;
    }

    // 비밀번호 일치 확인
    if (pwd !== pwdConfirm) {
      setPwdConfirmError("비밀번호가 일치하지 않습니다.");
      return;
    }
    
    // 사용자 ID 중복 확인 (최종 확인)
    const userIdExists = await checkUserIdExists(userid);
    if (userIdExists) {
      setUserIdTakenError('이미 사용 중인 아이디입니다.');
      return;
    }

    // 모든 필드가 유효하면 서버 요청
    const signupData = { 
      user_id: userid, 
      user_name: name, 
      nickname: nickname, 
      password: pwd 
    };

    try {
      const url = `${API_BASE_URL}/users/signup`;
      console.log('Signup request, API URL:', url);
      console.log('Signup data:', signupData);
      const response = await axios.post(url, signupData);
      const data = response.data;

      if (response.status === 200) {
        // Spring Boot에서 user_UN을 반환한다면
        const user_UN = data.user_UN;
        if (user_UN) {
          localStorage.setItem('userId', user_UN.toString());
          navigate(`/calendar/${user_UN}`);
        } else {
          // user_UN이 없으면 사용자 정보를 다시 조회
          try {
            const userResponse = await axios.get(`${API_BASE_URL}/users/userId/${userid}`);
            if (userResponse.data && userResponse.data.user_UN) {
              localStorage.setItem('userId', userResponse.data.user_UN.toString());
              navigate(`/calendar/${userResponse.data.user_UN}`);
            } else {
              navigate('/login');
            }
          } catch (err) {
            navigate('/login');
          }
        }
      } else {
        alert(data.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      let errorMessage = '회원가입 중 오류가 발생했습니다.';
      
      if (error.response) {
        // 서버 응답이 있는 경우
        const data = error.response.data;
        if (typeof data === 'string') {
          errorMessage = data;
        } else if (data && data.message) {
          errorMessage = data.message;
        } else if (data && typeof data === 'object') {
          errorMessage = JSON.stringify(data);
        }
        
        if (error.response.status === 404) {
          errorMessage = '서버를 찾을 수 없습니다. 백엔드가 실행 중인지 확인해주세요.';
        }
      } else if (error.request) {
        errorMessage = '서버에 연결할 수 없습니다. 백엔드가 실행 중인지 확인해주세요.';
      }
      
      alert(errorMessage);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">회원 가입</h2>

        <form onSubmit={loginHandler}>
          <div className="auth-input-group">
          <HomeInput
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && (
            <div className="auth-error">
              {nameError}
            </div>
          )}
        </div>

        <div className="auth-input-group">
          <HomeInput
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          {nicknameError && (
            <div className="auth-error">
              {nicknameError}
            </div>
          )}
        </div>

        <div className="auth-input-group">
          <HomeInput
            placeholder="아이디 (영문, 숫자 4-20자)"
            value={userid}
            onChange={handleUserIdChange}
            disabled={isCheckingUserId}
          />
          {isCheckingUserId && (
            <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
              아이디 확인 중...
            </div>
          )}
          {useridError && (
            <div className="auth-error">
              {useridError}
            </div>
          )}
          {useridTakenError && (
            <div className="auth-error">
              {useridTakenError}
            </div>
          )}
          {userid && !useridError && !useridTakenError && !isCheckingUserId && (
            <div style={{ fontSize: '12px', color: '#40c057', marginTop: '4px' }}>
              사용 가능한 아이디입니다.
            </div>
          )}
        </div>

        <div className="auth-input-group">
          <PwdInput
            placeholder="비밀번호"
            value={pwd}
            onChange={handlePwdChange}
            autoComplete="new-password"
          />
          {pwdError && (
            <div className="auth-error">
              {pwdError}
            </div>
          )}
        </div>

        <div className="auth-input-group">
          <PwdInput
            placeholder="비밀번호 확인"
            value={pwdConfirm}
            onChange={handlePwdConfirmChange}
            autoComplete="new-password"
          />
          {pwdConfirmError && (
            <div className="auth-error">
              {pwdConfirmError}
            </div>
          )}
          {pwdConfirm && !pwdConfirmError && pwd === pwdConfirm && (
            <div style={{ fontSize: '12px', color: '#40c057', marginTop: '4px' }}>
              비밀번호가 일치합니다.
            </div>
          )}
        </div>

          <div className="auth-button-group">
            <CommonButton type="submit" title="계정 만들기" fullWidth={true} />
          </div>
        </form>

        <div className="auth-footer">
          계정이 이미 있으신가요? &nbsp; {' | '} &nbsp;
          <span className="auth-link" onClick={() => navigate('/login')}>
            로그인
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
