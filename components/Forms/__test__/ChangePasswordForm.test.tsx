import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import ChangePasswordForm from "../ChangePasswordForm";

describe("ChangePasswordForm", () => {
  // beforeEach(() => {
  //   render (<ChangePasswordForm />);
  // })
  it("Should render", () => {
    const submitHandler = jest.fn();
    const handleSubmit = jest.fn();
    const error = "";
    const register = jest.fn();
    render(
      <ChangePasswordForm
        submitHandler={submitHandler}
        handleSubmit={handleSubmit}
        errors={error}
        register={register}
      />
    );
    const view = screen.getByLabelText("change-password-form");

    expect(view).toBeInTheDocument();
  });
});
