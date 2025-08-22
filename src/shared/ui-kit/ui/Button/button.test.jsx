import {render, screen} from "@testing-library/react";
import {Button} from "./Button";
import {expect, describe, it, vi} from "vitest";

describe("Button", () => {
  it("Doesn't render the button if no children or icon inside", () => {
    render(<Button />);
    const buttonElement = screen.queryByRole("button");
    expect(buttonElement).not.toBeInTheDocument();
  });
  it("Render the button with the correct text", () => {
    render(<Button>Click</Button>);
    const buttonElement = screen.getByText("Click");
    expect(buttonElement).toBeInTheDocument();
  });
  it("Render the button with the correct icon", () => {
    render(<Button icon='play'>Click</Button>);
    const iconElement = screen.getByTestId("icon");
    expect(iconElement).toBeInTheDocument();
  });
  it("Call onClick function when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    const buttonElement = screen.getByRole("button");
    buttonElement.click();
    expect(handleClick).toHaveBeenCalled(1);
  });
  it("Disables the button when disabled prop is true", () => {
    render(<Button disabled={true}>Click</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeDisabled();
  });
  it("onClick function is not called when disabled prop is true", () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled={true}>
        Click
      </Button>
    );
    const buttonElement = screen.getByRole("button");
    buttonElement.click();
    expect(handleClick).not.toHaveBeenCalled();
  });
});
