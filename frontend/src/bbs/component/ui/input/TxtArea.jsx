import React from "react";
import styled from "styled-components";

const StyledTextArea = styled.textarea`
    padding: 8px;
    width: 100vh;
    height: 50vh; /* ?’ì´ ?¤ì • */
    font-size: 15px;
    font-family: 'nanumsquarer', sans-serif; /* ?í•˜??ê¸€ê¼?ì¶”ê? */
    border: 1.5px solid #70805D;
    border-radius: 8px;
    margin-right: 4px;
    resize: none; /* ?¬ê¸° ì¡°ì • ë¹„í™œ?±í™” (?í•˜??ê²½ìš°) */

    &:focus {
        outline: none; /* ê¸°ë³¸ outline ?œê±° */
        border: 2.5px solid #70805D; /* ?¬ì»¤????*/    
    }

    &::placeholder {
        color: #888;
        font-size: 14px;
    }
`;

function TxtArea(props) {
    const { value, onChange, placeholder, maxLength } = props; // maxLength ì¶”ê?
    return (
        <StyledTextArea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            maxLength={maxLength} // maxLength ?ì„± ì¶”ê?
        />
    );
}

export default TxtArea;
