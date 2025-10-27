import { ThemeProvider } from "@emotion/react";
import { render } from "@testing-library/react";
import { darkTheme, lightTheme } from "../task2/theme";

export const renderWithTheme = (ui: React.ReactElement, isDark: boolean = false) =>
  render(
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>{ui}</ThemeProvider>
  );
