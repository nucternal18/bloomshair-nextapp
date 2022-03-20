import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import CheckoutStepsNav from "../CheckoutStepsNav";

describe("CheckoutStepsNav", () => {
  it("Should render", () => {
    render(<CheckoutStepsNav />);
    const view = screen.getByLabelText("checkout-steps-nav");
    expect(view).toBeInTheDocument();
  });
});
