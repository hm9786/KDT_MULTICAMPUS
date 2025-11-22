import React from "react";
import styled from "styled-components";

// Styled-components를 사용하여 버튼 스타일 정의
const StyledButton = styled.button`
    padding: ${props => props.$fullWidth ? '14px 0' : '12px 24px'};
    font-size: ${props => props.$fullWidth ? '17px' : '16px'};
    font-weight: 600;
    width: ${props => props.$fullWidth ? '100%' : 'auto'};
    max-width: ${props => props.$fullWidth ? '400px' : 'none'};
    border-radius: 12px;
    border: none;
    cursor: pointer;
    color: white;
    font-family: montserrat;
    transition: all 0.3s ease;
    
    /* variant에 따른 배경색 */
    background: ${props => {
        if (props.$variant === 'danger') {
            return 'linear-gradient(135deg, #ee5a6f 0%, #ff6b6b 100%)';
        } else if (props.$variant === 'success') {
            return 'linear-gradient(135deg, #40c057 0%, #51cf66 100%)';
        } else {
            // primary (기본값)
            return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }
    }};
    
    box-shadow: ${props => {
        if (props.$variant === 'danger') {
            return '0 4px 15px rgba(238, 90, 111, 0.4)';
        } else if (props.$variant === 'success') {
            return '0 4px 15px rgba(64, 192, 87, 0.4)';
        } else {
            return '0 4px 15px rgba(102, 126, 234, 0.4)';
        }
    }};

    &:hover {
        transform: translateY(-2px);
        box-shadow: ${props => {
            if (props.$variant === 'danger') {
                return '0 6px 20px rgba(238, 90, 111, 0.6)';
            } else if (props.$variant === 'success') {
                return '0 6px 20px rgba(64, 192, 87, 0.6)';
            } else {
                return '0 6px 20px rgba(102, 126, 234, 0.6)';
            }
        }};
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

function CommonButton(props) {
    const { 
        title, 
        onClick, 
        disabled, 
        type = 'button',
        variant = 'primary',
        fullWidth = false,
        children 
    } = props;
    
    return (
        <StyledButton 
            type={type}
            onClick={onClick} 
            disabled={disabled}
            $variant={variant}
            $fullWidth={fullWidth}
        >
            {title || children || "BUTTON"}
        </StyledButton>
    );
}

export default CommonButton;

