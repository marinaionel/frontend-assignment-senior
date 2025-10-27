import { describe, it, expect, vi } from "vitest";
import { fireEvent } from "@testing-library/react";
import { Checkbox } from ".";
import { renderWithTheme } from "@/src/testUtils/renderWithTheme";

describe("Checkbox component", () => {
  it("renders the checkbox", () => {
    const { getByRole } = renderWithTheme(<Checkbox />);

    const checkbox = getByRole("checkbox") as HTMLInputElement;
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBe(false);
  });

  it("toggles the checkbox when clicked", () => {
    const { getByRole } = renderWithTheme(<Checkbox />);

    const checkbox = getByRole("checkbox") as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });

  it("calls onChange callback with the correct value", () => {
    const onChange = vi.fn();
    const { getByRole } = renderWithTheme(<Checkbox onChange={onChange} />); // Pass it here
    const checkbox = getByRole("checkbox") as HTMLInputElement;

    fireEvent.click(checkbox);
    expect(onChange).toBeCalled();

    fireEvent.click(checkbox);
    expect(onChange).toBeCalled();

    expect(onChange).toHaveBeenCalledTimes(2);
  });
});
