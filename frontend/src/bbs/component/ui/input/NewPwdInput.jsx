import React from "react";
import styled from "styled-components";

// Styled-componentsë¥??¬ìš©?˜ì—¬ input ?¤í????•ì˜
const StyledInput = styled.input`
    padding: 8px; /* ?í•˜ì¢Œìš°???¨ë”© ì¶”ê? */
    width: 100%; /* ë²„íŠ¼??ê³ ì •???ˆë¹„ ?¤ì • */
    font-size: 16px;
    border: 1.5px solid #89892B;
    border-radius: 8px;
    margin-right: 4px; /* ë²„íŠ¼ê³¼ì˜ ê°„ê²© ì¡°ì • */
    background-color: #f5f5f5; /* ?°í•œ ?Œìƒ‰ ë°°ê²½ ì¶”ê? */
    &:focus {
        outline:none;
        border: 2.5px solid #89892B; /* ?¬ì»¤?????Œë‘ë¦???ë³€ê²?*/
    }
    
    &::placeholder {
        color: #888; /* placeholder ?‰ìƒ */
        font-size: 14px; /* placeholder ê¸€???¬ê¸° ì¡°ì • */
    }
`;

function NewPwdInput(props) {
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

export default NewPwdInput; 
