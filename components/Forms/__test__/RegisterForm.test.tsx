import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import RegisterForm from "../RegisterForm";

describe("RegisterForm", () => {
  it("Should render", () => {
    const submitHandler = jest.fn();
    const handleSubmit = jest.fn();
    const error = {
      name: { type: "", message: "name is required" },
      email: { type: "", message: "password is required" },
      password: { type: "", message: "confirm password is required" },
      confirmPassword: { type: "", message: "confirm password is required" },
    };
    const register = jest.fn();
    render(
      <RegisterForm
        submitHandler={submitHandler}
        handleSubmit={handleSubmit}
        errors={error}
        register={register}
        buttonName="Register"
        isLoading={false}
      />
    );
    const view = screen.getByLabelText("register-form");
    expect(view).toBeInTheDocument();
  });
});
