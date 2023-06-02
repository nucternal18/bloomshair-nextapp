import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import ShippingAddressForm from "../ShippingAddressForm";

describe("ShippingAddressForm", () => {
  it("Should render", () => {
    const submitHandler = jest.fn();
    const handleSubmit = jest.fn();
    const error = {
      address: { type: "", message: "Address is required" },
      city: { type: "", message: "City is required" },
      postalCode: { type: "", message: "Postal Code is required" },
      country: { type: "", message: "Country is required" },
    };
    const register = jest.fn();
    render(
      <ShippingAddressForm
        submitHandler={submitHandler}
        handleSubmit={handleSubmit}
        errors={error}
        register={register}
        show={true}
        handleClose={jest.fn()}
      />
    );
    const view = screen.getByLabelText("shipping-address-form");
    expect(view).toBeInTheDocument();
  });
});
