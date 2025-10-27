import styled from "@emotion/styled";
import React, { FC, ReactNode } from "react";

export type CardVariant = "elevated" | "outlined" | "flat";

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  padding?: string;
  borderRadius?: string;
  media?: ReactNode;
  footer?: ReactNode;
  style?: React.CSSProperties;
}

const StyledCard = styled.div<CardProps>`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ borderRadius }) => borderRadius || "0.5rem"};
  padding: ${({ padding }) => padding || "1rem"};
  width: 100%;
  box-sizing: border-box;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${({ variant, theme }) => {
    switch (variant) {
      case "outlined":
        return `
          border: 0.1rem solid ${theme.colors.secondary}33;
          box-shadow: none;
        `;
      case "flat":
        return `
          border: none;
          box-shadow: none;
        `;
      case "elevated":
      default:
        return `
          border: none;
          box-shadow: 0 0.25rem 0.75rem ${theme.colors.shadow};
          &:hover {
            box-shadow: 0 0.375rem 1rem ${theme.colors.shadow};
          }
        `;
    }
  }}
`;

const CardMedia = styled.div`
  width: 100%;
  overflow: hidden;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;

  img,
  video {
    display: block;
    width: 100%;
    height: 12.5rem;
    object-fit: cover;
  }
`;

const CardFooter = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
`;

const CardContent = styled.div<{ hasMedia?: boolean }>`
  margin-top: ${({ hasMedia }) => (hasMedia ? "1rem" : "0")};
`;

const Card: FC<CardProps> = ({
  children,
  variant = "elevated",
  padding,
  borderRadius,
  media,
  footer,
  style,
  ...props
}) => {
  return (
    <StyledCard
      variant={variant}
      padding={padding}
      borderRadius={borderRadius}
      style={{ ...style }}
      {...props}
    >
      {media && <CardMedia data-testid="card-media">{media}</CardMedia>}
      <CardContent hasMedia={!!media}>{children}</CardContent>
      {footer && <CardFooter data-testid="card-footer">{footer}</CardFooter>}
    </StyledCard>
  );
};

export default Card;
