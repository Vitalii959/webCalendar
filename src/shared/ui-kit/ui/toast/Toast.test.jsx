import {screen, render, jest} from "@testing-library/react";
import {describe, it, expect, vi} from "vitest";

import {Toast} from "./Toast";

describe("Toast", () => {
  it("renders the toast with the correct title and message", () => {
    render(<Toast data-testid='toast'>This is a toast message</Toast>);
    jest;
    const toast = screen.getByTestId("toast");
    const message = screen.getByText("This is a toast message");

    expect(toast).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });
  it("calls onClose function when close button is clicked", () => {
    const handleClose = vi.fn();
    render(
      <Toast
        showToast={true}
        setShowToast={vi.fn()}
        onClick={handleClose}
        data-testid='toast'
      >
        This is a toast message
      </Toast>
    );

    const closeButton = screen.getByRole("button");
    closeButton.click();

    expect(handleClose).toHaveBeenCalled(1);
  });
  it("hide the toast after 2 seconds", () => {
    const handleClose = vi.fn();
    vi.useFakeTimers();
    render(
      <Toast showToast={true} setShowToast={handleClose} data-testid='toast'>
        This is a toast message
      </Toast>
    );
    expect(handleClose).not.toHaveBeenCalled();

    vi.advanceTimersByTime(2000);

    expect(handleClose).toHaveBeenCalled(1);
  });
});
