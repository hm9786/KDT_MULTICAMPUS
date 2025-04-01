import React from "react";
import styled from "styled-components";

const StyledTextArea = styled.textarea`
    padding: 8px;
    width: 100vh;
    height: 50vh; /* 높이 설정 */
    font-size: 15px;
    font-family: 'nanumsquarer', sans-serif; /* 원하는 글꼴 추가 */
    border: 1.5px solid #70805D;
    border-radius: 8px;
    margin-right: 4px;
    resize: none; /* 크기 조정 비활성화 (원하는 경우) */

    &:focus {
        outline: none; /* 기본 outline 제거 */
        border: 2.5px solid #70805D; /* 포커스 시 */    
    }

    &::placeholder {
        color: #888;
        font-size: 14px;
    }
`;

function TxtArea(props) {
    const { value, onChange, placeholder, maxLength } = props; // maxLength 추가
    return (
        <StyledTextArea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            maxLength={maxLength} // maxLength 속성 추가
        />
    );
}

export default TxtArea;
