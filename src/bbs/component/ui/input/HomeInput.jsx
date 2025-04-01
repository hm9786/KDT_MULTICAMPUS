import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
    padding: 8px;
    width: 380px;
    font-size: 16px;
    border: 1.5px solid #70805D;
    border-radius: 8px;
    margin-right: 4px;
    background-color: #f5f5f5;

    &:focus {
        outline: none; /* 기본 outline 제거 */
        border: 2.5px solid #70805D; /* 포커스 시 */    
    }

    &::placeholder {
        color: #888;
        font-size: 14px;
    }
`;

function HomeInput(props) {
    const { value, onChange, placeholder } = props;
    return (
        <StyledInput
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
}

export default HomeInput;
