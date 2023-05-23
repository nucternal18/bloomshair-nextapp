import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import CheckoutStepsNav from ".";

describe("CheckoutStepsNav", () => {
  it("Should render", () => {
    const steps = ["Shipping", "Payment", "Review & Place Order"];
    const currentStep = 1;
    render(<CheckoutStepsNav steps={steps} currentStep={currentStep} />);
    const view = screen.getByLabelText("checkout-steps-nav");
    expect(view).toBeInTheDocument();
  });
});
