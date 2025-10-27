import { screen } from "@testing-library/react";
import { lightTheme } from "src/task2/theme";
import { describe, expect, it } from "vitest";
import TextInput from ".";
import { renderWithTheme } from "src/testUtils/renderWithTheme";

describe("Text Input Component", () => {
  it("renders a normal input", () => {
    renderWithTheme(<TextInput placeholder="Test input" />);
    const input = screen.getByPlaceholderText("Test input");
    expect(input).toBeInTheDocument();
    expect(input).not.toBeDisabled();
  });

  it("applies error styling when error prop is true", () => {
    renderWithTheme(<TextInput placeholder="Error input" error />);
    const input = screen.getByPlaceholderText("Error input");
    const styles = getComputedStyle(input);
    expect(styles.borderColor).toBe(lightTheme.colors.error);
  });

  it("does not apply error styling when error prop is false", () => {
    renderWithTheme(<TextInput placeholder="No error input" />);
    const input = screen.getByPlaceholderText("No error input");
    const styles = getComputedStyle(input);
    expect(styles.borderColor).not.toBe(lightTheme.colors.error);
  });

  it("is disabled when disabled prop is true", () => {
    renderWithTheme(<TextInput placeholder="Disabled input" disabled />);
    const input = screen.getByPlaceholderText("Disabled input");
    expect(input).toBeDisabled();
  });
});
