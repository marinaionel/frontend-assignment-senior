import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { useState } from "react";
import Task2 from ".";
import { darkTheme, lightTheme } from "./theme";
import { renderWithTheme } from "../testUtils/renderWithTheme";

declare global {
  var __IS_DARK__: boolean;
}

vi.mock("@emotion/react", async () => {
  const actual = await vi.importActual("@emotion/react");
  return {
    ...actual,
    useTheme: () => (globalThis.__IS_DARK__ ? darkTheme : lightTheme),
  };
});

vi.mock("./store/useThemeStore", () => ({
  useThemeStore: () => {
    const [isDark, setIsDark] = useState(false);
    globalThis.__IS_DARK__ = isDark;
    return {
      isDark,
      toggleTheme: () => setIsDark((prev) => !prev),
    };
  },
}));

describe("Task2 Component", () => {
  it("renders without crashing", () => {
    renderWithTheme(<Task2 />);
    expect(screen.getByTestId("theme-toggle")).toBeDefined();
    expect(screen.getAllByTestId("mock-card")).toHaveLength(3);
    expect(screen.getAllByTestId("mock-input")).toHaveLength(4);
  });

  it("toggles theme when button clicked", () => {
    renderWithTheme(<Task2 />);
    const toggleButton = screen.getByTestId("theme-toggle");
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
    renderWithTheme(<Task2 />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(10);
  });
});
