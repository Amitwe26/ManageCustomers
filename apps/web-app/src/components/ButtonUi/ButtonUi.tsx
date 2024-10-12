import React from 'react';
import styled from 'styled-components';

interface ButtonUiProps {
  label: string;
  onClick: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'delete' | 'softOrange' | 'light';
  disabled?: boolean;
  className?: string;
}

const ButtonUi = ({
  label,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className,
}: ButtonUiProps) => (
  <StyledButton
    className={className}
    type={type}
    onClick={onClick}
    $variant={variant}
    disabled={disabled}
  >
    <div>{label}</div>
  </StyledButton>
);

export default ButtonUi;

interface ButtonProps {
  $variant: 'primary' | 'secondary' | 'delete' | 'softOrange' | 'light';
}

const StyledButton = styled.button<ButtonProps>`
  padding: 5px 15px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  color: white;
  background-color: ${({ $variant, theme }) => theme.colors.button[$variant]};
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    transform: scale(1.02);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;
