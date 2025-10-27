import styled from "@emotion/styled";
import React, { FC, InputHTMLAttributes } from "react";
import { Theme } from "src/task2/theme";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const StyledInput = styled.input<TextInputProps>`
  width: 100%;
  display: block;
  box-sizing: border-box;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border: 0.1rem solid
    ${({ theme, error }) =>
      error ? (theme as Theme).colors.error : (theme as Theme).colors.border};
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.2s;
  background-color: ${({ theme }) => (theme as Theme).colors.background};
  color: ${({ theme }) => (theme as Theme).colors.text};

  &:focus {
    border-color: ${({ theme, error }) =>
      error ? (theme as Theme).colors.error : (theme as Theme).colors.primary};
    box-shadow: 0 0 0.25rem
      ${({ theme, error }) =>
        error ? (theme as Theme).colors.error : (theme as Theme).colors.shadow};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const TextInput: FC<TextInputProps> = ({ error = false, ...props }) => {
  return <StyledInput error={error} {...props} />;
};

export default TextInput;
