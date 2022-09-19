import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import ChangePasswordForm from "../ChangePasswordForm";

describe("ChangePasswordForm", () => {
  // beforeEach(() => {
  //   render (<ChangePasswordForm />);
  // })
  it("Should render", () => {
    const submitHandler = jest.fn();
    const handleSubmit = jest.fn();
    const errors = {
      password: { type: "", message: "password is required" },
      confirmPassword: { type: "", message: "confirm password is required" },
    };
    const register = jest.fn();
    render(
      <ChangePasswordForm
        submitHandler={submitHandler}
        handleSubmit={handleSubmit}
        errors={errors}
        register={register}
      />
    );
    const view = screen.getByLabelText("change-password-form");

    expect(view).toBeInTheDocument();
  });
});
