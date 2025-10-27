import { FC, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { darkTheme, lightTheme } from "./theme";
import Button, { ButtonColor, ButtonSize, ButtonVariant } from "./components/Button";
import { FaArrowLeft, FaArrowRight, FaSyncAlt } from "react-icons/fa";
import Card from "./components/Card";
import TextInput from "./components/TextInput";
import "./index.css";

const Container = styled.div<{ bg: string; color: string }>`
  background-color: ${({ bg }) => bg};
  color: ${({ color }) => color};
  padding: 2rem;
  transition: background-color 0.3s ease;
`;

const Task2: FC = () => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  const btnColors: ButtonColor[] = ["primary", "secondary", "accent"];
  const btnSizes: ButtonSize[] = ["small", "medium", "large"];
  const btnVariants: ButtonVariant[] = ["contained", "outlined", "text"];
  const cardVariants = ["elevated", "outlined", "flat"] as const;

  return (
    <ThemeProvider theme={theme}>
      <Container bg={theme.colors.background} color={theme.colors.text}>
        <section className="section" id="theme-toggle">
          <h2 className="section-title">Theme Toggle</h2>
          <Button color="primary" onClick={() => setIsDark(p => !p)}>
            {isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
          </Button>
        </section>

        <section className="section" id="button">
          <h2 className="section-title">Button</h2>

          <h3 className="subsection-title">Sizes</h3>
          <div className="grid">
            {btnSizes.map(size => (
              <Button key={size} size={size}>
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </Button>
            ))}
          </div>

          <h3 className="subsection-title">Variants</h3>
          <div className="grid">
            {btnVariants.map(variant =>
              btnColors.map(color => (
                <Button key={`${variant}-${color}`} variant={variant} color={color}>
                  {`${color} ${variant}`}
                </Button>
              ))
            )}
          </div>

          <h3 className="subsection-title">With Icons</h3>
          <div className="grid">
            <Button color="primary" icon={<FaArrowLeft />}>Back</Button>
            <Button color="accent" icon={<FaArrowRight />} iconPosition="right">Next</Button>
            <Button color="secondary" variant="outlined" icon={<FaSyncAlt />}>Refresh</Button>
          </div>

          <h3 className="subsection-title">Disabled</h3>
          <div className="grid">
            {btnVariants.map(variant =>
              btnColors.map(color => (
                <Button key={`disabled-${variant}-${color}`} variant={variant} color={color} disabled>
                  {`${color} ${variant}`}
                </Button>
              ))
            )}
          </div>

          <h3 className="subsection-title">Loading</h3>
          <div className="grid">
            {btnVariants.map(variant =>
              btnColors.map(color => (
                <Button
                  key={`loading-${variant}-${color}`}
                  variant={variant}
                  color={color}
                  isLoading
                  icon={<FaSyncAlt />}
                  iconPosition="left"
                >
                  {`${color} ${variant}`}
                </Button>
              ))
            )}
          </div>

          <h3 className="subsection-title">Icon Only</h3>
          <div className="grid">
            {btnVariants.map(variant =>
              btnColors.map(color => (
                <Button
                  key={`icon-only-${variant}-${color}`}
                  variant={variant}
                  color={color}
                  icon={<FaSyncAlt />}
                  aria-label={`${color} ${variant} button`}
                />
              ))
            )}
          </div>
        </section>

        <section className="section" id="text-input">
          <h2 className="section-title">Text Input</h2>
          <div className="flex-column">
            <div>
              <h3 className="subsection-title">Normal</h3>
              <TextInput placeholder="Normal input" />
            </div>
            <div>
              <h3 className="subsection-title">Error</h3>
              <TextInput error placeholder="Error input" />
            </div>
            <div>
              <h3 className="subsection-title">Disabled</h3>
              <TextInput placeholder="Disabled input" disabled />
            </div>
            <div>
              <h3 className="subsection-title">With Value</h3>
              <TextInput placeholder="With value" defaultValue="Hello world!" />
            </div>
          </div>
        </section>

        <section className="section" id="card">
          <h2 className="section-title">Card</h2>
          <div className="grid">
            {cardVariants.map((variant, idx) => (
              <Card
                key={variant}
                variant={variant}
                padding="1rem"
                borderRadius="0.5rem"
                media={<img src="https://picsum.photos/200" alt={`Random ${variant}`} className="card-image" />}
                footer={
                  <>
                    <Button color="primary" size="small">Action 1</Button>
                    <Button color="accent" size="small" variant="outlined">Action 2</Button>
                  </>
                }
              >
                <h3>{variant.charAt(0).toUpperCase() + variant.slice(1)} Card</h3>
                <p>This is a {variant} card. You can place any content here.</p>
              </Card>
            ))}
          </div>
        </section>
      </Container>
    </ThemeProvider>
  );
};

export default Task2;
