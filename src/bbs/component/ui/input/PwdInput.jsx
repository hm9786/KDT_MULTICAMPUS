import React from "react";
import styled from "styled-components";

// Styled-components를 사용하여 input 스타일 정의
const StyledInput = styled.input`
    padding: 8px; /* 상하좌우에 패딩 추가 */
    width: 380px; /* 버튼의 고정된 너비 설정 */
    font-size: 16px;
    border: 1.5px solid #70805D;
    border-radius: 8px;
    margin-right: 4px; /* 버튼과의 간격 조정 */
    background-color: #f5f5f5; /* 연한 회색 배경 추가 */
    &:focus {
        outline: none; /* 기본 outline 제거 */
        border: 2.5px solid #70805D; /* 포커스 시 */    
    }
    
    &::placeholder {
        color: #888; /* placeholder 색상 */
        font-size: 14px; /* placeholder 글자 크기 조정 */
    }
`;

function PwdInput(props) {
    const { value, onChange, placeholder } = props;
    return (
        <StyledInput
            type="password"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
}

export default PwdInput; 
