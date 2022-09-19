import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import RequestPasswordResetForm from "../RequestPasswordResetForm";

describe("RequestPasswordResetForm", () => {
  it("Should render", () => {
    const submitHandler = jest.fn();
    const handleSubmit = jest.fn();
    const error = {
      email: { type: "", message: "password is required" },
    };
    const register = jest.fn();
    render(
      <RequestPasswordResetForm
        submitHandler={submitHandler}
        handleSubmit={handleSubmit}
        errors={error}
        register={register}
      />
    );
    const view = screen.getByLabelText("request-password-reset-form");
    expect(view).toBeInTheDocument();
  });
});
