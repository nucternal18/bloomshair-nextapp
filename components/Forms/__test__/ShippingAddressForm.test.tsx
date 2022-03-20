import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import ShippingAddressForm from "../ShippingAddressForm";

describe("ShippingAddressForm", () => {
  it("Should render", () => {
    const submitHandler = jest.fn();
    const handleSubmit = jest.fn();
    const error = "";
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
