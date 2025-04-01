import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

  // 최소 8자, 숫자, 대문자, 소문자, 특수 문자(?/~!@#$%^&*)를 포함하는지 검사
  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[?/~!@#$%^&*])[a-zA-Z\d?/~!@#$%^&*]{8,}$/.test(password);
  };

  const checkUserIdExists = async (userid) => {
    try {
      const response = await axios.post('YOUR_BACKEND_API/checkUserId', { userid });
      return response.data.exists; // exists가 true면 아이디가 이미 사용 중인 것
    } catch (error) {
      console.error('Error checking user ID:', error);
      return false; // 오류 발생 시 사용 중이 아닌 것으로 간주
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    // 오류 메시지 초기화
    setNameError('');
    setUserIdError('');
    setNicknameError('');
    setPwdError('');
    setUserIdTakenError('');

    // 각 입력 필드에 대한 오류 메시지 설정
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
          ※ 8자 이상의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.<br />
          ※ 특수 문자: &nbsp; ?/~!@#$%^&*
        </>
      );
      return;
    }
    
    // 사용자 ID 중복 확인
    const userIdExists = await checkUserIdExists(userid);
    if (userIdExists) {
      setUserIdTakenError('사용할 수 없는 아이디입니다.'); // 아이디 중복 메시지 설정
      return;
    }

    // 모든 필드가 유효하면 서버 요청
    const signupData = { userid, name, nickname, pwd };

    try {
      const response = await axios.post('YOUR_BACKEND_API/signup', signupData);
      const data = response.data;

      if (response.status === 200) {
        localStorage.setItem('userId', data.userId); // userId를 localStorage에 저장
        navigate(`/calendar/${data.userId}`); // 해당 사용자 페이지로 이동
      } else {
        alert(data.message || '회원가입에 실패했습니다.'); // 오류 메시지 처리
      }
    } catch (error) {
      console.error('Error:', error);
      alert('회원가입 중 오류가 발생했습니다.');
      alert(`${name}, ${nickname}, ${userid}, ${pwd}`) // 확인용
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
        계정이 있으신가요? &nbsp; {' | '} &nbsp;
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
    background: '#F1ECD9',
  },
  title:{
    fontFamily:'nanumsquarer',
    color: '#34513A',
  },
  input: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    margin: '5px',
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    margin: '10px',
  },
  error: {
    color: 'red', // 오류 메시지의 색상
    margin: '5px 0',
    fontSize: '14px',
    alignSelf: 'flex-start', // 왼쪽 정렬
  },
  span: {
    color: '#34513A',
    margin: '20px',
    fontFamily:'nanumsquarer'
  },
  linkText: {
    cursor: 'pointer',
    textDecoration: 'underline',
    color: '#34513A',
  },
};

export default Signup;
