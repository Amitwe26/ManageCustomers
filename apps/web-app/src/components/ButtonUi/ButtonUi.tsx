import React from 'react';
import styled from 'styled-components';

interface ButtonUiProps {
  label: string;
  onClick: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary'; // Optional, to switch between button styles
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
  $variant: 'primary' | 'secondary';
}

const StyledButton = styled.button<ButtonProps>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  color: white;
  background-color: ${({ $variant, theme }) =>
    $variant === 'primary'
      ? theme.colors.backgroundColor.softOrange
      : 'rgb(96,169,239,.9)'};
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: ${({ $variant }) =>
      $variant === 'primary'
        ? 'rgba(26, 64, 124, 0.9)'
        : 'rgba(96,169,239, 0.9)'};
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
