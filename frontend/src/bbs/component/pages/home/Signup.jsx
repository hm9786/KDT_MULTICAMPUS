import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../../../utils/api";
import HomeInput from "../../ui/input/HomeInput";
import PwdInput from "../../ui/input/PwdInput";
import HomeButton from "../../ui/button/HomeButton";

function Signup() {
  const navigate = useNavigate();

  // 이름, 아이디, 닉네임, 비밀번호
  const [name, setName] = useState('');
  const [userid, setUserId] = useState('');
  const [nickname, setNickname] = useState('');
  const [pwd, setPwd] = useState('');

  // 오류 메세지
  const [nameError, setNameError] = useState('');
  const [useridError, setUserIdError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [useridTakenError, setUserIdTakenError] = useState('');

  // 최소 8자, 영문자, 대문자, 숫자 문자(?/~!@#$%^&*)를 포함하는지 검사
  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[?/~!@#$%^&*])[a-zA-Z\d?/~!@#$%^&*]{8,}$/.test(password);
  };

  const checkUserIdExists = async (userid) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/checkUserId`, { user_id: userid });
      return response.data.exists; // exists가 true면 아이디가 이미 사용 중인 것
    } catch (error) {
      console.error('Error checking user ID:', error);
      return false; // 오류 발생 시 사용 중이 아닌 것으로 간주
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지

    // 오류 메시지 초기화
    setNameError('');
    setUserIdError('');
    setNicknameError('');
    setPwdError('');
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
    
    // 사용자 ID 중복 확인
    const userIdExists = await checkUserIdExists(userid);
    if (userIdExists) {
      setUserIdTakenError('사용중인 아이디입니다.'); // 아이디 중복 메시지 설정
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
      const response = await axios.post(`${API_BASE_URL}/users/signup`, signupData);
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
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        alert('회원가입 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div name="container" style={styles.container}>
      <div name="title">
        <h2 style={styles.title}>회원 가입</h2>
      </div>

      <div name="input" style={styles.input}>
        <HomeInput
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {nameError && (
          <div style={styles.error}>
            {nameError}
          </div>
        )}
      </div>

      <div name="input" style={styles.input}>
        <HomeInput
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        {nicknameError && (
          <div style={styles.error}>
            {nicknameError}
          </div>
        )}
      </div>

      <div name="input" style={styles.input}>
        <HomeInput
          placeholder="아이디"
          value={userid}
          onChange={(e) => setUserId(e.target.value)}
        />
        {useridError && (
          <div style={styles.error}>
            {useridError}
          </div>
        )}
        {useridTakenError && (
          <div style={styles.error}>
            {useridTakenError}
          </div>
        )}
      </div>

      <div name="input" style={styles.input}>
        <PwdInput
          placeholder="비밀번호"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        {pwdError && (
          <div style={styles.error}>
            {pwdError}
          </div>
        )}
      </div>

      <div name="button" style={styles.button}>
        <HomeButton title="계정 만들기" onClick={loginHandler} />
      </div>

      <div name="span" style={styles.span}>
        계정이 이미 있으신가요? &nbsp; {' | '} &nbsp;
        <span onClick={() => navigate('/login')} style={styles.linkText}>
          로그인
        </span>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
  },
  title:{
    fontFamily:'nanumsquarer',
    color: '#ffffff',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  input: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    margin: '10px 0',
    width: '100%',
    maxWidth: '400px',
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    margin: '20px 0',
    width: '100%',
    maxWidth: '400px',
  },
  error: {
    color: '#ff6b6b',
    margin: '5px 0',
    fontSize: '14px',
    alignSelf: 'flex-start',
    width: '100%',
    padding: '5px 10px',
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '4px',
  },
  span: {
    color: '#ffffff',
    margin: '20px 0',
    fontFamily:'nanumsquarer',
    fontSize: '1rem',
  },
  linkText: {
    cursor: 'pointer',
    textDecoration: 'underline',
    color: '#ffffff',
    fontWeight: 'bold',
    transition: 'opacity 0.3s',
  },
};

export default Signup;
