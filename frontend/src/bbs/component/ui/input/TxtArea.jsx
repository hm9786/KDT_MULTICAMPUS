import React from "react";
import styled from "styled-components";

const StyledTextArea = styled.textarea`
    padding: 14px 20px;
    width: 100%;
    min-height: 150px;
    font-size: 16px;
    font-family: 'nanumsquarer', sans-serif;
    border: 2px solid rgba(102, 126, 234, 0.2);
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.98);
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    box-sizing: border-box;
    resize: vertical;
    line-height: 1.6;

    &:focus {
        outline: none;
        border: 2px solid var(--color-primary-start);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
        transform: translateY(-1px);
        background-color: #ffffff;
    }

    &::placeholder {
        color: #999;
        font-size: 15px;
    }
`;

function TxtArea(props) {
    const { value, onChange, placeholder, maxLength } = props;
    return (
        <StyledTextArea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            maxLength={maxLength}
        />
    );
}

export default TxtArea;
