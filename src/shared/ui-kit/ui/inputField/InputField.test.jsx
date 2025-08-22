import {screen, render, fireEvent} from "@testing-library/react";
import {describe, it, expect, vi} from "vitest";
import {InputField} from "./InputField";

describe("InputField", () => {
  it("renders the input field with the correct label and type", () => {
    render(<InputField title='Username' type='text' />);

    const label = screen.getByText("Username");
    const input = screen.getByRole("textbox");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("shows an error message when error prop is passed", () => {
    render(
      <InputField title='Username' type='text' error='This field is required' />
    );

    const errorMessage = screen.getByText("This field is required");

    expect(errorMessage).toBeInTheDocument();
  });

  it("calls onChange function when input value changes", () => {
    const handleChange = vi.fn();
    render(<InputField title='Username' type='text' onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, {target: {value: "New Value"}});

    expect(handleChange).toHaveBeenCalledWith("New Value");
  });
  it("toggles password visibility when eye icon is clicked", () => {
    render(<InputField title='Password' type='password' data-testid='input' />);

    const input = screen.getByTestId("input");
    const eyeIcon = screen.getByRole("button");

    fireEvent.click(eyeIcon);

    expect(input).toHaveAttribute("type", "text");

    fireEvent.click(eyeIcon);

    expect(input).toHaveAttribute("type", "password");
  });
  it("render the input field with the correct placeholder", () => {
    render(
      <InputField
        title='Username'
        type='text'
        placeholder='Enter your username'
      />
    );

    const input = screen.getByPlaceholderText("Enter your username");

    expect(input).toBeInTheDocument();
  });
  it("disables the input field when disabled prop is true", () => {
    render(<InputField title='Username' type='text' disabled={true} />);

    const input = screen.getByRole("textbox");

    expect(input).toBeDisabled();
  });
  it("does not call onChange function when disabled", () => {
    const handleChange = vi.fn();
    render(
      <InputField
        title='Username'
        type='text'
        onChange={handleChange}
        disabled={true}
        data-testid='input'
      />
    );

    const input = screen.getByTestId("input");
    fireEvent.change(input, {target: {value: "New Value"}});
    expect(input).toBeDisabled();
    screen.debug();

    expect(handleChange).not.toHaveBeenCalled();
  });
});
