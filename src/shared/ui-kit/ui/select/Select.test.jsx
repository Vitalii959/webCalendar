import {screen, render, fireEvent} from "@testing-library/react";
import {describe, it, expect, vi} from "vitest";

import {Select} from "./Select";

describe("Select", () => {
  const options = [
    {title: "Option 1", value: "option1"},
    {title: "Option 2", value: "option2"},
    {title: "Option 3", value: "option3"}
  ];
  it("doesn't render the select component if no options are provided", () => {
    render(<Select title='Select' data-testid='select' />);
    const select = screen.queryByTestId("select");
    expect(select).not.toBeInTheDocument();
  });
  it("render title", () => {
    render(<Select title='Select' data-testid='select' options={options} />);
    const title = screen.getByText("Select");
    expect(title).toBeInTheDocument();
  });
  it("renders the select with the correct options", () => {
    render(<Select options={options} title='Select' data-testid='select' />);

    const select = screen.getByTestId("select");
    const title = screen.getByText("Select");
    expect(select).toBeInTheDocument();
    expect(title).toHaveTextContent("Select");
  });
  it("calls onSelect function when an option is selected", () => {
    const handleSelect = vi.fn();

    render(
      <Select
        options={options}
        title='Select'
        data-testid='select'
        onSelect={handleSelect}
      />
    );

    const select = screen.getByTestId("select");
    select.value = "option2";
    fireEvent.change(select, {target: {value: "option2"}});

    expect(handleSelect).toHaveBeenCalledWith("option2");
  });
});
