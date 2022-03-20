import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import LoginForm from "../LoginForm";

describe("LoginForm", () => {
  it("Should render", () => {
    const submitHandler = jest.fn();
    const handleSubmit = jest.fn();
    const error = "";
    const register = jest.fn();
    render(
      <LoginForm
        submitHandler={submitHandler}
        handleSubmit={handleSubmit}
        errors={error}
        register={register}
      />
    );
    const view = screen.getByLabelText("login-form");
    expect(view).toBeInTheDocument();
  });
});
