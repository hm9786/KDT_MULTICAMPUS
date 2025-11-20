import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../../utils/api";
import HomeInput from "../../ui/input/HomeInput";
import PwdInput from "../../ui/input/PwdInput";
import HomeButton from "../../ui/button/HomeButton";

function Login() {
  const navigate = useNavigate();

  const [userid, setUserId] = useState('');   // 아이디
  const [pwd, setPwd] = useState('');         // 비밀 번호
  const [useridError, setUserIdError] = useState(''); // 아이디 오류 메시지
  const [pwdError, setPwdError] = useState('');       // 비밀번호 오류 메시지

  const loginHandler = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    setUserIdError(''); // 오류 메시지 초기화
    setPwdError('');    // 오류 메시지 초기화

    // 각 입력 필드에 대한 오류 메시지 설정
    if (!userid) {
      setUserIdError("아이디를 입력해주세요.");
      return;
    }

    if (!pwd) {
      setPwdError("비밀번호를 입력해주세요.");
      return;
    }

    // 둘 다 유효하면 서버 요청
    if (userid && pwd) {
      const loginData = { userId: userid, password: pwd }; // 필드 이름 수정

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
    <div name="container" style={styles.container}>
      <div name="title">
        <h2 style={styles.title}>Login</h2>
      </div>

      <div name="input" style={styles.input}>
        <HomeInput
          placeholder="ID"
          value={userid} // 상태 값 연결
          onChange={     // 상태 업데이트 핸들러
            (e) => setUserId(e.target.value)
          } 
        />
        {useridError && ( // 아이디 오류 메시지가 있을 경우에만 표시
          <div style={styles.error}>
            {useridError}
          </div>
        )}
      </div>

      <div name="input" style={styles.input}>
        <PwdInput
          placeholder="PASSWORD"
          value={pwd} // 상태 값 연결
          onChange={  // 상태 업데이트 핸들러
            (e) => setPwd(e.target.value)
          } 
        />
        {pwdError && ( // 비밀번호 오류 메시지가 있을 경우에만 표시
          <div style={styles.error}>
            {pwdError}
          </div>
        )}
      </div>

      <div name="button" style={styles.button}>
        {/* loginHandler 연결 */}
        <HomeButton title="로그인"
                    onClick={loginHandler} />
      </div>

      <div name="span" style={styles.span}>
        회원가입이 필요하신가요? &nbsp; {' | '} &nbsp;
        <span onClick={() => navigate('/signup')}
              style={styles.linkText}>
              회원가입
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
    fontFamily:'montserrat',
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
    margin: '10px 0',
    width: '100%',
    maxWidth: '400px',
    background: 'transparent',
  },
  
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px 0',
    width: '100%',
    maxWidth: '400px',
    background: 'transparent',
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

export default Login;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import HomeInput from "../../ui/input/HomeInput";
// import PwdInput from "../../ui/input/PwdInput";
// import HomeButton from "../../ui/button/HomeButton";

// function Login() {
//   const navigate = useNavigate();

//   const [userid, setUserId] = useState('');   // 아이디
//   const [pwd, setPwd] = useState('');         // 비밀 번호
//   const [useridError, setUserIdError] = useState(''); // 아이디 오류 메시지
//   const [pwdError, setPwdError] = useState('');       // 비밀번호 오류 메시지

//   const loginHandler = async (e) => {

//     e.preventDefault(); // 기본 폼 제출 동작 방지

//     setUserIdError(''); // 오류 메시지 초기화
//     setPwdError('');    // 오류 메시지 초기화

//     // 각 입력 필드에 대한 오류 메시지 설정
//     if (!userid) {
//       setUserIdError("아이디를 입력해주세요.");
//       return;
//     }

//     if (!pwd) {
//       setPwdError("비밀번호를 입력해주세요.");
//       return;
//     }

//     // 둘 다 유효하면 서버 요청
//     if (userid && pwd) {
//       const loginData = { userid, pwd };

//       try {
//         const response = await axios.post('YOUR_BACKEND_API/login', loginData);
//         const data = response.data;

//         if (response.status === 200) {
//           localStorage.setItem('userId', data.userId);    // userId를 localStorage에 저장
//           navigate(`/calendar/${data.userId}`);           // 해당 사용자 페이지로 이동
//         } else {
//           alert(data.message || '로그인에 실패했습니다.');  // 오류 메시지 처리
//         }
//       } catch (error) {
//         console.error('Error:', error);
//         alert('로그인 중 오류가 발생했습니다.');
//         alert(`아이디: ${userid}, 비밀번호:${pwd}`) //확인용

//       }
//     }
//   };

//   return (
//     <div name="container" style={styles.container}>
//       <div name="title">
//         <h2 style={styles.title}>Login</h2>
//       </div>

//       <div name="input" style={styles.input}>
//         <HomeInput
//           placeholder="ID"
//           value={userid} // 상태 값 연결
//           onChange={     // 상태 업데이트 핸들러
//             (e) => setUserId(e.target.value)
//           } 
//         />
//         {useridError && ( // 아이디 오류 메시지가 있을 경우에만 표시
//           <div style={styles.error}>
//             {useridError}
//           </div>
//         )}
//       </div>

//       <div name="input" style={styles.input}>
//         <PwdInput
//           placeholder="PASSWORD"
//           value={pwd} // 상태 값 연결
//           onChange={  // 상태 업데이트 핸들러
//             (e) => setPwd(e.target.value)
//           } 
//         />
//         {pwdError && ( // 비밀번호 오류 메시지가 있을 경우에만 표시
//           <div style={styles.error}>
//             {pwdError}
//           </div>
//         )}
//       </div>

//       <div name="button" style={styles.button}>
//         {/* loginHandler 연결 */}
//         <HomeButton title="로그인"
//                     onClick={loginHandler} />
//       </div>

//       <div name="span" style={styles.span}>
//         회원가입이 필요하신가요? &nbsp; {' | '} &nbsp;
//         <span onClick={() => navigate('/signup')}
//               style={styles.linkText}>
//               회원가입
//         </span>
//       </div>
//     </div>
//   );
// }

// const styles = {

//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100vh',
//     background: '#F1ECD9',
//   },

//   title:{
//     fontFamily:'montserrat',
//     color: '#34513A',
//   },

//   input: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: '5px',
//     background: 'transparent',
//   },
  
//   button: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: '10px',
//     background: 'transparent',
//   },

//   error: {
//     color: 'red',
//     margin: '5px 0',
//     fontSize: '14px',
//     alignSelf: 'flex-start',
//   },

//   span: {
//     color: '#34513A',
//     margin: '20px',
//     fontFamily:'nanumsquarer'

//   },

//   linkText: {
//     cursor: 'pointer',
//     textDecoration: 'underline',
//     color: '#34513A',
//   },
  
// };

// export default Login;

