/* eslint-disable no-useless-escape */
import { IForm } from "@lib/types";
import React from "react";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";

type Inputs = {
  password: string;
  confirmPassword: string;
};
interface IChangePasswordForm extends IForm<Inputs> {
  isLoading?: boolean;
}

function ChangePasswordForm({
  submitHandler,
  errors,
  handleSubmit,
  register,
}: IChangePasswordForm) {
  return (
    <form
      aria-label="change-password-form"
      data-testid="change-password-form"
      onSubmit={handleSubmit(submitHandler)}
      className="px-2 pt-6 pb-8 mx-2 mb-4 bg-transparent w-full"
    >
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block mb-2 text-base font-bold text-gray-700"
        >
          Password
        </label>
        <input
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none "
          id="password"
          type="password"
          placeholder="Enter password"
          {...register("password", {
            required: "This is required",
            minLength: {
              value: 7,
              message: "Please enter a password with at least 7 characters",
            },
            maxLength: {
              value: 15,
              message: "Please enter a password not more than 15 characters",
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{7,})/,
              message:
                "Password must contain at least one uppercase letter, one number and one special character",
            },
          })}
        />
        {errors.password && (
          <ErrorMessage variant="danger">
            {errors.password.message}
          </ErrorMessage>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="block mb-2 text-base font-bold text-gray-700"
        >
          Confirm Password
        </label>
        <input
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-md appearance-none focus:outline-none "
          id="confirmPassword"
          type="password"
          placeholder="Confirm password"
          {...register("confirmPassword", {
            required: "This is required",
            minLength: {
              value: 7,
              message: "Please enter a password with at least 7 characters",
            },
            maxLength: {
              value: 15,
              message: "Please enter a password not more than 15 characters",
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{7,})/,
              message:
                "Password must contain at least one uppercase letter, one number and one special character",
            },
          })}
        />
        {errors.confirmPassword && (
          <ErrorMessage variant="danger">
            {errors.confirmPassword.message}
          </ErrorMessage>
        )}
      </div>
      <Button type="submit" color="dark" className="w-full">
        Reset Password
      </Button>
    </form>
  );
}

export default ChangePasswordForm;
