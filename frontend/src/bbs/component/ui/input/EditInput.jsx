import React from "react";
import styled from "styled-components";

const StyledInput = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;

  input {
    padding: 14px 20px;
    width: 100%;
    font-size: 16px;
    border: 2px solid rgba(102, 126, 234, 0.2);
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.98);
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    box-sizing: border-box;

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
  }

  .char-counter {
    position: absolute;
    right: 16px;
    bottom: 14px;
    font-size: 12px;
    color: #999;
    background: rgba(255, 255, 255, 0.9);
    padding: 2px 6px;
    border-radius: 4px;
    pointer-events: none;
  }
`;

function EditInput(props) {
  const { value = '', onChange, maxLength, placeholder } = props;

  return (
    <StyledInput>
      <input
        type="text"
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
      />
      {maxLength && (
        <div className="char-counter">
          {value.length}/{maxLength}
        </div>
      )}
    </StyledInput>
  );
}

export default EditInput;
