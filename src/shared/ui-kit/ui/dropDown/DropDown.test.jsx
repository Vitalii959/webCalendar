import {screen, render, fireEvent} from "@testing-library/react";
import {describe, it, expect, vi} from "vitest";

import {DropDown} from "./DropDown";

describe("DropDown", () => {
  it("Does not render when options not passed", () => {
    render(<DropDown data-testid='dropDown'></DropDown>);
    const dropDown = screen.queryByTestId("dropDown");
    expect(dropDown).not.toBeInTheDocument();
  });
  it("Renders when options passed", () => {
    render(
      <DropDown
        data-testid='dropDown'
        options={[{title: "Option 1", value: "1"}]}
      ></DropDown>
    );
    const dropDown = screen.getByTestId("dropDown");
    expect(dropDown).toBeInTheDocument();
  });
  it("Calls onSelect when option selected", () => {
    const onSelect = vi.fn();
    render(
      <DropDown
        data-testid='dropDown'
        options={[{title: "Option 1", value: "2"}]}
        onSelect={onSelect}
      ></DropDown>
    );
    const dropDown = screen.getByTestId("dropDown");
    fireEvent.change(dropDown, {target: {value: "2"}});

    expect(dropDown.value).toBe("2");
    expect(onSelect).toHaveBeenCalledWith("2");
  });
});
