import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
    padding: 8px;
    width: 100vh;
    font-size: 16px;
    font-family: 'nanumsquarer', sans-serif; /* ?êÌïò??Í∏ÄÍº?Ï∂îÍ? */
    border: 1.5px solid #70805D;
    border-radius: 8px;
    margin-right: 4px;

    &:focus {
        outline: none; /* Í∏∞Î≥∏ outline ?úÍ±∞ */
        border: 2.5px solid #70805D; /* ?¨Ïª§????*/    
    }

    &::placeholder {
        color: #888;
        font-size: 14px;
    }
`;

function GoalInput(props) {
    const { value, onChange, placeholder, maxLength } = props; // maxLength Ï∂îÍ?
    return (
        <StyledInput
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            maxLength={maxLength} // maxLength ?çÏÑ± Ï∂îÍ?
        />
    );
}

export default GoalInput;
