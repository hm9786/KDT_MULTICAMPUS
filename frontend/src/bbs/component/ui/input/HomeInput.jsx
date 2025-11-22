import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
    padding: 14px 20px;
    width: 100%;
    max-width: 400px;
    font-size: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.95);
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &:focus {
        outline: none;
        border: 2px solid rgba(255, 255, 255, 0.8);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
    }

    &::placeholder {
        color: #999;
        font-size: 15px;
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
