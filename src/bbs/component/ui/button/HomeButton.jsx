import React from "react";
import styled from "styled-components";

// Styled-components를 사용하여 버튼 스타일 정의
const StyledButton = styled.button`
    padding: 14px 0;
    font-size: 17px;
    font-weight: 600;
    width: 100%;
    max-width: 400px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    color: white;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    font-family: montserrat;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
    }

    &:active {
        transform: translateY(0);
    }

    &:disabled {
        background: #ccc;
        cursor: not-allowed;
        box-shadow: none;
        transform: none;
    }
`;

function HomeButton(props) {
    const { title, onClick, disabled } = props;
    return (
        <StyledButton onClick={onClick} disabled={disabled}>
            {title || "BUTTON"}
        </StyledButton>
    );
}

export default HomeButton;
