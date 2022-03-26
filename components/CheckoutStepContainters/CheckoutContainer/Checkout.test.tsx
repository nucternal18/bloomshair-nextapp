import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { userInfo } from "os";
import Checkout from "./Checkout";

describe("Checkout", () => {
  const userInfo = {
    name: "John Doe",
    email: "jdoe@test.com",
    shippingAddress: {
      address: "123 Main St",
      city: "New York",
      postalCode: "10001",
      country: "USA",
      deliveryMethod: "RoyalMail standard",
    },
  };
  const paypalClientID = "paypal-client-id";
  const handleStepChange = jest.fn();
  it("should render", () => {
    render(
      <Checkout
        userInfo={userInfo}
        paypalClientID={paypalClientID}
        handleStepChange={handleStepChange}
      />
    );
    expect(screen.getByText("Checkout")).toBeInTheDocument();
  });
});
