import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import LoginForm from "../LoginForm";

describe("LoginForm", () => {
  it("Should render", () => {
    const submitHandler = jest.fn();
    const handleSubmit = jest.fn();
    const error = {
      email: { type: "", message: "password is required" },
      password: { type: "", message: "confirm password is required" },
    };
    const crsfToken = "123";
    const register = jest.fn();
    render(
      <LoginForm
        submitHandler={submitHandler}
        handleSubmit={handleSubmit}
        errors={error}
        register={register}
        csrfToken={crsfToken}
      />
    );
    const view = screen.getByLabelText("login-form");
    expect(view).toBeInTheDocument();
  });
});
