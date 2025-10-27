import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Task2 from ".";
import { darkTheme, lightTheme } from "./theme";

describe("Task2 Component", () => {
  it("renders without crashing", () => {
    render(<Task2 />);
    expect(screen.getByText("Toggle Theme")).toBeDefined();
    expect(screen.getAllByTestId("mock-card")).toHaveLength(3);
    expect(screen.getAllByTestId("mock-input")).toHaveLength(4);
  });

  it("toggles theme when button clicked", () => {
    render(<Task2 />);

    const toggleButton = screen.getByText("Toggle Theme");
    const container = screen.getByTestId("container");

    expect(container).toHaveStyle(
      `background-color: ${lightTheme.colors.background}`
    );

    fireEvent.click(toggleButton);
    expect(container).toHaveStyle(
      `background-color: ${darkTheme.colors.background}`
    );

    fireEvent.click(toggleButton);
    expect(container).toHaveStyle(
      `background-color: ${lightTheme.colors.background}`
    );
  });

  it("renders all button variants and colors", () => {
    render(<Task2 />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(10);
  });
});
