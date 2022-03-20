import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import RegisterForm from "../RegisterForm";

describe("RegisterForm", () => {
  it("Should render", () => {
    const submitHandler = jest.fn();
    const handleSubmit = jest.fn();
    const error = "";
    const register = jest.fn();
    render(
      <RegisterForm
        submitHandler={submitHandler}
        handleSubmit={handleSubmit}
        errors={error}
        register={register}
        buttonName="Register"
      />
    );
    const view = screen.getByLabelText("register-form");
    expect(view).toBeInTheDocument();
  });
});
