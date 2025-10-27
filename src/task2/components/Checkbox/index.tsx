import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { FC, useRef } from "react";
import { FaCheck } from "react-icons/fa";
import "./index.css";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  disabled?: boolean;
  "aria-label"?: string;
}

const StyledCheckbox = styled.div<{
  checked: boolean;
  disabled?: boolean;
  theme: any;
}>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid
    ${({ theme, checked }) =>
      checked ? theme.colors.primary : theme.colors.border};
  background-color: ${({ theme, checked }) =>
    checked ? theme.colors.primary : theme.colors.background};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover {
    ${({ theme, disabled }) =>
      !disabled &&
      `
        border-color: ${theme.colors.primary};
        box-shadow: 0 0 0 3px ${theme.colors.accent}15;
      `}
  }

  &:focus-within {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

export const Checkbox: FC<CheckboxProps> = ({
  checked = false,
  onChange,
  disabled = false,
  ...props
}) => {
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  return (
    <StyledCheckbox
      checked={checked}
      disabled={disabled}
      theme={theme}
      onClick={handleClick}
    >
      <input
        ref={inputRef}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="sr-only"
        {...props}
      />
      <FaCheck
        size={12}
        color={theme.colors.background}
        style={{
          transition: "all 0.15s ease",
          visibility: checked ? "visible" : "hidden",
        }}
        aria-hidden="true"
      />
    </StyledCheckbox>
  );
};
