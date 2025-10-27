import styled from "@emotion/styled";
import React, { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { Theme } from "src/task2/theme";

export type ButtonColor = "primary" | "secondary" | "accent";
export type ButtonVariant = "contained" | "outlined" | "text";
export type ButtonSize = "small" | "medium" | "large";
export type IconPosition = "left" | "right";
export type ButtonRole = "button" | "submit" | "reset";
export type ButtonType = "button" | "submit" | "reset";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  isLoading?: boolean;
  // semantic purpose of an element for assistive technologies (screen readers, voice control)
  role?: ButtonRole;
  // defines its behavior in a form
  type?: ButtonType;
}

const getSizeStyles = (size: ButtonProps["size"] = "medium") => {
  switch (size) {
    case "small":
      return `
        font-size: 0.8rem;
        padding: 0 0.5rem;
        height: 2rem;
        gap: 0.25rem;
      `;
    case "large":
      return `
        font-size: 1.2rem;
        padding: 0 1.5rem;
        height: 3.5rem;
        gap: 0.75rem;
      `;
    case "medium":
    default:
      return `
        font-size: 1rem;
        padding: 0 1rem;
        height: 2.5rem;
        gap: 0.5rem;
      `;
  }
};

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
`;

const Spinner = styled.span<{ color?: ButtonColor; variant?: ButtonVariant }>`
  display: inline-block;
  border: 2px solid transparent;
  border-radius: 50%;
  width: 1em;
  height: 1em;
  animation: spin 0.8s linear infinite;

  ${({ theme, color = "primary", variant = "contained" }) => {
    const t = theme as Theme;
    const mainColor = t.colors[color];
    const textColor = t.colors.text;
    const spinnerColor = variant === "contained" ? textColor : mainColor;

    return `
      border-top-color: ${spinnerColor};
      border-right-color: ${spinnerColor}88;
    `;
  }}

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const StyledButton = styled.button<ButtonProps>`
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  width: auto;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 0.5em;

  ${({ theme, variant = "contained", color = "primary" }) => {
    const t = theme as Theme;
    const mainColor = t.colors[color];
    const textColor = t.colors.text;

    switch (variant) {
      case "outlined":
        return `
          background: transparent;
          color: ${mainColor};
          border: 1.5px solid ${mainColor};
          &:hover:enabled {
            background-color: ${mainColor}1A;
          }
        `;
      case "text":
        return `
          background: transparent;
          color: ${mainColor};
          border: none;
          &:hover:enabled {
            background-color: ${mainColor}0D;
          }
        `;
      case "contained":
      default:
        return `
          background-color: ${mainColor};
          color: ${textColor};
          border: none;
          &:hover:enabled {
            opacity: 0.9;
          }
        `;
    }
  }}

  ${({ size }) => getSizeStyles(size)}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => (theme as Theme).colors.accent};
    outline-offset: 2px;
  }

  svg {
    display: inline-block;
    flex-shrink: 0;
  }
`;

const Button: FC<ButtonProps> = ({
  children,
  icon,
  iconPosition = "left",
  isLoading = false,
  disabled = false,
  color = "primary",
  variant = "contained",
  size = "medium",
  role = "button",
  type = "button",
  "aria-label": ariaLabel,
  ...props
}) => {
  const isDisabled = disabled || isLoading;
  const hasVisibleLabel = !!children;
  const accessibleLabel =
    !hasVisibleLabel && icon ? ariaLabel || "button" : undefined;

  return (
    <StyledButton
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading ? true : undefined}
      aria-label={accessibleLabel}
      color={color}
      variant={variant}
      size={size}
      role={role}
      {...props}
    >
      {icon && iconPosition === "left" && !isLoading && (
        <IconWrapper>{icon}</IconWrapper>
      )}
      {isLoading && iconPosition === "left" && (
        <Spinner
          id="button-spinner"
          color={color}
          variant={variant}
          aria-hidden="true"
        />
      )}

      {children}

      {isLoading && iconPosition === "right" && (
        <Spinner
          id="button-spinner"
          color={color}
          variant={variant}
          aria-hidden="true"
        />
      )}
      {icon && iconPosition === "right" && !isLoading && (
        <IconWrapper>{icon}</IconWrapper>
      )}
    </StyledButton>
  );
};

export default Button;
