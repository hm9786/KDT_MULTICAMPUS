import React from "react";
import styled from "styled-components";

// Styled-components를 사용하여 input 스타일 정의
// 프로필 - 닉네임, 자기소개 변경 칸
const StyledInput = styled.div`
  position: relative;
  display: inline-block;
  width: 100%; /* 인풋 너비 설정 */

  input {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    width: 100%; /* 인풋이 div의 전체 너비를 차지 */
    font-size: 14px;
    border: 1.5px solid #89892B;
    border-radius: 8px;
    background-color: white;

    &:focus {
      outline: none;
          border: 2.5px solid #89892B;

    }

    &::placeholder {
      color: #888;
      font-size: 14px;
    }
  }

  .char-counter {
    position: absolute;
    right: 10px; /* 오른쪽 끝에 위치 */
    bottom: 10px; /* 하단에 위치 */
    font-size: 12px;
    color: #888; /* 글자 수 표시 색상 */
  }
`;

function EditInput(props) {
  const { value = '', onChange, maxLength, placeholder } = props; // value의 초기값을 빈 문자열로 설정

  return (
    <StyledInput>
      <input
        type="text"
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
      />
      <div className="char-counter">
        {value.length}/{maxLength}
      </div>
    </StyledInput>
  );
}

export default EditInput;