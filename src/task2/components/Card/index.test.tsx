import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Card from ".";
import Button from "../Button";
import { renderWithTheme } from "@/src/testUtils/renderWithTheme";

describe("Card Component", () => {
  it("renders children content correctly", () => {
    renderWithTheme(
      <Card>
        <p>Test content</p>
      </Card>
    );
    expect(screen.getByText("Test content")).toBeDefined();
  });

  it("renders media and footer when provided", () => {
    renderWithTheme(
      <Card
        media={<img src="test.jpg" alt="media" />}
        footer={<Button>Click</Button>}
      >
        <p>Card content</p>
      </Card>
    );

    const media = screen.getByTestId("card-media");
    expect(media).toBeDefined();
    expect(screen.getByAltText("media")).toBeDefined();

    const footer = screen.getByTestId("card-footer");
    expect(footer).toBeDefined();
    expect(screen.getByText("Click")).toBeDefined();
  });

  it("does not render footer when footer prop is not provided", () => {
    renderWithTheme(<Card>Content only</Card>);
    expect(screen.queryByTestId("card-footer")).toBeNull();
  });

  it("does not render media when media prop is not provided", () => {
    renderWithTheme(<Card>Content only</Card>);
    expect(screen.queryByTestId("card-media")).toBeNull();
  });
});
