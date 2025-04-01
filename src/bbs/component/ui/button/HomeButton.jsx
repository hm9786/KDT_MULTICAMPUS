import React from "react";
import styled from "styled-components";

// Styled-components를 사용하여 버튼 스타일 정의
const StyledButton = styled.button`
    padding: 12px 0; /* 버튼 높이 */
    font-size: 16px;
    width: 400px; /* 버튼 너비*/
    border-radius: 30px; /* 모서리 둥근 정도 */
    border: none;
    cursor: pointer;
    color: white; /* 글씨 색상 */
    background-color: #70805D; /* 버튼 배경색 */
    font-family:montserrat;
    &:disabled {
        background: gray; /* 비활성화된 버튼의 배경색 변경 */
        cursor: not-allowed; /* 비활성화된 상태에서 커서 변경 */
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
