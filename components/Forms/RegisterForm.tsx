/* eslint-disable no-useless-escape */
import { Button, PasswordInput, TextInput } from "@mantine/core";
import React from "react";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi";

import FormRowInput from "./FormComponents/FormRowInput";
import { IForm } from "@lib/types";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface IRegistrationForm extends IForm<Inputs> {
  buttonName: string;
  isLoading: boolean;
}

function RegisterForm({
  submitHandler,
  errors,
  handleSubmit,
  register,
  buttonName,
  isLoading,
}: IRegistrationForm) {
  return (
    <form
      aria-label="register-form"
      data-testid="register-form"
      onSubmit={handleSubmit(submitHandler)}
      className="px-2 pt-6 pb-8 mx-2 mb-4 bg-transparent w-full"
    >
      <div className="mb-4">
        <FormRowInput
          className="w-full"
          type="name"
          title={"Name"}
          inputType="text"
          aria-label="name"
          prependComponent={<HiOutlineUser fontSize={20} color="lightgrey" />}
          placeholder="Enter your name"
          {...register("name", {
            required: "This is required",
            minLength: {
              value: 2,
              message: "Please enter a name with at least 2 characters",
            },
            pattern: {
              value: /^[A-Za-z -]+$/,
              message: "Please enter a valid name",
            },
          })}
          errors={errors.name}
        />
      </div>
      <div className="mb-4">
        <FormRowInput
          className="w-full "
          id="email"
          type="email"
          inputType="email"
          title={"Email Address"}
          aria-label="email"
          prependComponent={<MdOutlineEmail fontSize={20} color="lightgrey" />}
          placeholder="Enter email"
          {...register("email", {
            required: "This is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address",
            },
          })}
          errors={errors.email}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block mb-2 text-base font-bold text-gray-700"
        >
          Password
        </label>
        <PasswordInput
          className="w-ful "
          id="password"
          type="password"
          placeholder="Enter password"
          icon={<IoLockClosedOutline />}
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
          error={errors.password && errors.password.message}
          size="md"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="block mb-2 text-base font-bold text-gray-700"
        >
          Confirm Password
        </label>
        <PasswordInput
          className="w-full"
          id="confirmPassword"
          type="password"
          aria-label="confirm password"
          placeholder="Confirm password"
          icon={<IoLockClosedOutline />}
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
          error={errors.confirmPassword && errors.confirmPassword.message}
          size="md"
        />
      </div>
      <Button
        loading={isLoading}
        type="submit"
        color="dark"
        variant="outline"
        className="w-full bg-gray-900 text-gray-200"
        uppercase
        fullWidth
      >
        {buttonName}
      </Button>
    </form>
  );
}

export default RegisterForm;
