import Button from "../../ui/button/Button";
import NewPwdInput from "../../ui/input/NewPwdInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../../utils/api";

function EditPwd({ userid }) { // userId를 props로 전달받는다고 가정

  const navigate = useNavigate();
  const [newpwd, setNewPwd] = useState('');
  const [checkpwd, setCheckPwd] = useState('');
  const [error, setError] = useState('');

  const newpwdHandler = (e) => {
    setNewPwd(e.target.value);
    if (checkpwd && e.target.value !== checkpwd) {
      setError('* 비밀번호가 일치하지 않습니다.');
    } else {
      setError('');
    }
  };

  const checkpwdHandler = (e) => {
    setCheckPwd(e.target.value);
    if (newpwd && e.target.value !== newpwd) {
      setError('* 비밀번호가 일치하지 않습니다.');
    } else {
      setError('');
    }
  };

  const backHandler =(e)=>{
    alert("비밀번호 변경이 취소됩니다.");
    navigate('/profile')
  }




  const isValidPwd = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[?/~!@#$%^&*])[A-Za-z\d?/~!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  const submitHandler = async () => {
    if (!isValidPwd(newpwd)) {
      setError('* 비밀번호는 최소 8자 이상, 소문자, 대문자, 숫자, 특수문자를 포함해야 합니다.');
    } else if (newpwd !== checkpwd) {
      setError('* 비밀번호가 일치하지 않습니다.');
    } else {
      setError('');
      try {
        const response = await axios.post(`${API_BASE_URL}/users/change-password`, {
          userId: userid,
          password: newpwd,
        });

        if (response.data.success) {
          alert('비밀번호가 성공적으로 변경되었습니다.');
          setNewPwd(''); // 입력값 초기화
          setCheckPwd(''); // 입력값 초기화
          navigate('/profile');
        } else {
          alert('비밀번호 변경 중 오류가 발생했습니다.');
        }
      } catch (e) {
        console.error('비밀번호 변경 오류: ', e);
        alert('서버 오류로 비밀번호 변경에 실패했습니다.');
        alert(newpwd); // 확인용
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>
        <img
          src="./img/button/arrow-left.png"
          alt="뒤로"
          style={styles.backButton}
          onClick={backHandler}
        />
        <span style={styles.titleline}> 비밀번호 변경</span>
      </div>

      <hr style={styles.hr} />

      <div style={styles.warning}>
        <span> 안전한 비밀번호를 만드세요. 같은 비밀번호를 쓰는 다른 계정에서도 사용하면 마세요. </span>
      </div>
      <div style={styles.center}>
        <div style={styles.pwdcontainer}>
          <div style={styles.pwdinput}>
            <NewPwdInput id="newpwd"
                         value={newpwd}
                         onChange={newpwdHandler}
                         placeholder="새 비밀번호" />
          </div>
          <div style={styles.pwdline}>
            <p />
            <span>비밀번호 조건: </span>
            <p>소문자, 대문자, 숫자, 특수문자를 포함하고 8자 이상의 비밀번호를 입력하세요. 다른 아이디에 쓰는 비밀번호와 완전 물건처럼 추측하기 쉬운 이름을 사용하면 마세요.</p>
          </div>
          <div style={styles.pwdinput}>
            <NewPwdInput id="check"
                         value={checkpwd}
                         onChange={checkpwdHandler}
                         placeholder="새 비밀번호 확인" />
          </div>

          {/* 오러 메세지 */}
          {error && <p style={styles.error}>{error}</p>}
          <div style={styles.pwdbutton}>
            <Button title="비밀번호 변경"
                    onClick={submitHandler} />
          </div>
        </div>

        <div style={styles.paddingBottom}></div>
      </div>
    </div>
  );
}
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
    },

    title: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: '10%',
        padding: '30px',
        fontSize: '20px',
        fontFamily: 'gmarket',
    },

    titleline:{
        marginTop: '5px',
        marginLeft: '20px'
    },

    backButton:{
        width:'30px',
        height:'30px',
        cursor: 'pointer'
    },
    
    hr: {
        width: '100%',
        border: 'none',
        borderTop: '1px solid #89892B',
        marginBottom: '20px',
    },

    warning: {
        display: 'flex',
        flexDirection: 'row',
        padding: '30px',
        marginBottom: '20px',
        marginLeft: '10%',
        fontSize: '15px',
        fontFamily: 'nanumsquarer',
    },

    center: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },

    pwdcontainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        margin: '1px',
        border: '2px solid #89892B',
        background:'white',
        borderRadius: '10px',
        padding: '2%',
        fontFamily: 'nanumsquarer',
    },

    pwdinput: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '25px',
        marginBottom: '10px',
        marginRight: '10px',
        marginLeft: '10px',
        fontFamily: 'nanumsquarer',
    },

    pwdbutton: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginTop: '25px',
        marginBottom: '10px',
        marginRight: '10px',
    },

    pwdline: {
        fontSize: '13px',
        marginTop: '10px',
        marginLeft: '15px',
    },

    line: {
        fontSize: '20px',
        fontFamily: 'gmarket',
    },

    error: {
        color: 'red',
        fontSize: '12px',
        paddingLeft:'10px'
    },

    paddingBottom: { 
        padding: '5%' 
    },
};

export default EditPwd;
