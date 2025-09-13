import {render} from "@testing-library/react";
import {describe, it, expect, vi} from "vitest";

import {Modal} from "./modal";

describe("Modal", () => {
  it("renders the modal with the correct title and content", () => {
    const {getByText} = render(
      <Modal title='Test Modal' showModal={true} setShowModal={vi.fn()}>
        <p>Test Content</p>
      </Modal>
    );

    expect(getByText("Test Modal")).toBeInTheDocument();
    expect(getByText("Test Content")).toBeInTheDocument();
  });
  it("calls setShowModal when close button is clicked", () => {
    const setShowModal = vi.fn();
    const {getByRole} = render(
      <Modal title='Test Modal' showModal={true} setShowModal={setShowModal}>
        <p>Test Content</p>
      </Modal>
    );

    const closeButton = getByRole("button");
    closeButton.click();

    expect(setShowModal).toHaveBeenCalledWith(false);
  });
});
