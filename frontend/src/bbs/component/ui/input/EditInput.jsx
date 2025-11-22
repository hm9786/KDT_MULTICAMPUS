import React from "react";
import styled from "styled-components";

// Styled-componentsë¥??¬ìš©?˜ì—¬ input ?¤í????•ì˜
// ?„ë¡œ??- ?‰ë„¤?? ?ê¸°?Œê°œ ë³€ê²?ì¹?
const StyledInput = styled.div`
  position: relative;
  display: inline-block;
  width: 100%; /* ?¸í’‹ ?ˆë¹„ ?¤ì • */

  input {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    width: 100%; /* ?¸í’‹??div???„ì²´ ?ˆë¹„ë¥?ì°¨ì? */
    font-size: 14px;
    border: 1.5px solid #89892B;
    border-radius: 8px;
    background-color: white;

    &:focus {
      outline: none;
          border: 2.5px solid #89892B;

    }

    &::placeholder {
      color: #888;
      font-size: 14px;
    }
  }

  .char-counter {
    position: absolute;
    right: 10px; /* ?¤ë¥¸ìª??ì— ?„ì¹˜ */
    bottom: 10px; /* ?˜ë‹¨???„ì¹˜ */
    font-size: 12px;
    color: #888; /* ê¸€?????œì‹œ ?‰ìƒ */
  }
`;

function EditInput(props) {
  const { value = '', onChange, maxLength, placeholder } = props; // value??ì´ˆê¸°ê°’ì„ ë¹?ë¬¸ì?´ë¡œ ?¤ì •

  return (
    <StyledInput>
      <input
        type="text"
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
      />
      <div className="char-counter">
        {value.length}/{maxLength}
      </div>
    </StyledInput>
  );
}

export default EditInput;
