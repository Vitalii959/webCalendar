import {CheckBox} from "./CheckBox";

import {render, screen} from "@testing-library/react";
import {describe, it, expect, vi} from "vitest";

describe("Checkbox", () => {
  it("Render checkbox with correct title", () => {
    render(<CheckBox title='Click me' type='checkbox'></CheckBox>);
    const checkbox = screen.getByRole("checkbox", {p: /Click me/i});
    expect(checkbox).toBeInTheDocument();
  });
  it("Can not be clicked when disabled", () => {
    render(<CheckBox disabled={true} type='checkbox'></CheckBox>);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
  });
  it("Checked when checked is true", () => {
    render(<CheckBox checked={true} type='checkbox'></CheckBox>);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });
  it("Unchecked when checked is false", () => {
    render(<CheckBox checked={false} type='checkbox'></CheckBox>);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });
  it("Calls setChecked when clicked", () => {
    const setChecked = vi.fn();
    render(
      <CheckBox
        checked={false}
        setChecked={setChecked}
        type='checkbox'
      ></CheckBox>
    );
    const checkbox = screen.getByRole("checkbox");
    checkbox.click();
    expect(setChecked).toHaveBeenCalled();
  });
});
