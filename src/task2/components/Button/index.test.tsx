import { screen } from "@testing-library/react";
import { darkTheme } from "src/task2/theme";
import { describe, expect, it } from "vitest";
import Button from ".";
import { renderWithTheme } from "src/testUtils/renderWithTheme";

describe("Button component", () => {
  it("renders children text", () => {
    renderWithTheme(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("renders spinner and disables button when loading", () => {
    renderWithTheme(<Button isLoading>Loading</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();

    const spinner = document.getElementById("button-spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("does not render spinner when not loading", () => {
    renderWithTheme(<Button>Click</Button>);
    const spinner = document.getElementById("button-spinner");
    expect(spinner).toBeNull();
  });

  it("applies aria-label", () => {
    renderWithTheme(<Button icon={<span />} aria-label="Settings" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Settings");
  });

  it("works with dark theme", () => {
    renderWithTheme(<Button>Dark Mode</Button>, true);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Dark Mode");
    expect(button).toHaveStyle(`background-color: ${darkTheme.colors.primary}`);
  });

  it("is disabled when disabled prop is true", () => {
    renderWithTheme(<Button disabled={true}>Click</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("is not disabled when disabled prop is false", () => {
    renderWithTheme(<Button disabled={false}>Click</Button>);
    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
  });
});
