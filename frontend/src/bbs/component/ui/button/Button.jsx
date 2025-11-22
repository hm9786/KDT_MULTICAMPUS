import React from "react";
import styled from "styled-components";

// Styled-componentsë¥??¬ìš©?˜ì—¬ ë²„íŠ¼ ?¤í????•ì˜
const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #70805D;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-family: nanumquarel;
  font-size: bold;
  &:hover {
    background-color: #444;
  }
`;

function Button(props) {
    const { title, onClick, disabled } = props;
    return (
        <StyledButton onClick={onClick} disabled={disabled}>
            {title || "BUTTON"}
        </StyledButton>
    );
}

export default Button;
