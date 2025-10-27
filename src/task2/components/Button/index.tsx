import styled from "@emotion/styled";
import React, { ButtonHTMLAttributes, FC, ReactNode } from "react";
import "./index.css";

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

const Spinner = styled.span<{ color?: ButtonColor; variant?: ButtonVariant }>`
  display: inline-block;
  border: 2px solid transparent;
  border-radius: 50%;
  width: 1em;
  height: 1em;
  animation: spin 0.8s linear infinite;

  ${({ theme, color = "primary", variant = "contained" }) => {
    const mainColor = theme.colors[color];
    const textColor = theme.colors.text;
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
  ${({ theme, variant = "contained", color = "primary" }) => {
    const mainColor = theme.colors[color];
    const textColor = theme.colors.text;

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

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
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
      className={`btn btn-${size}`}
      {...props}
    >
      {icon && iconPosition === "left" && !isLoading && (
        <span className="icon-wrapper">{icon}</span>
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
        <span className="icon-wrapper">{icon}</span>
      )}
    </StyledButton>
  );
};

export default Button;
