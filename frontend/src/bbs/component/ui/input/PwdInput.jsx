import React from "react";
import styled from "styled-components";

// Styled-components�??�용?�여 input ?��????�의
const StyledInput = styled.input`
    padding: 8px; /* ?�하좌우???�딩 추�? */
    width: 380px; /* 버튼??고정???�비 ?�정 */
    font-size: 16px;
    border: 1.5px solid #70805D;
    border-radius: 8px;
    margin-right: 4px; /* 버튼과의 간격 조정 */
    background-color: #f5f5f5; /* ?�한 ?�색 배경 추�? */
    &:focus {
        outline: none; /* 기본 outline ?�거 */
        border: 2.5px solid #70805D; /* ?�커????*/    
    }
    
    &::placeholder {
        color: #888; /* placeholder ?�상 */
        font-size: 14px; /* placeholder 글???�기 조정 */
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
