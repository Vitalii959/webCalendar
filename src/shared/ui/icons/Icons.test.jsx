import {screen, render} from "@testing-library/react";
import {describe, it, expect} from "vitest";

import {Icons} from "./Icons";

describe("Icons", () => {
  it("renders the icon correctly", () => {
    render(<Icons name='eye' data-testid='icon' />);
    const icon = screen.getByTestId("icon");
    expect(icon).toBeInTheDocument();
  });
  it("does not render an icon if the name is incorrect", () => {
    render(<Icons name='invalidIcon' />);
    const icon = screen.queryByTestId("icon");
    expect(icon).not.toBeInTheDocument();
  });
});
