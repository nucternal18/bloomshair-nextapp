import { PasswordInput } from "@mantine/core";
import Link from "next/link";
import {
  FieldErrorsImpl,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";
import FormRowInput from "./FormComponents/FormRowInput";

type Inputs = {
  email: string;
  password: string;
};
interface ILoginFormProps {
  errors: FieldErrorsImpl<Inputs>;
  handleSubmit: UseFormHandleSubmit<Inputs>;
  register: UseFormRegister<Inputs>;
  submitHandler: SubmitHandler<Inputs>;
  csrfToken: string;
}

function LoginForm({
  submitHandler,
  handleSubmit,
  errors,
  register,
  csrfToken,
}: ILoginFormProps) {
  return (
    <form
      aria-label="login-form"
      data-testid="login-form"
      onSubmit={handleSubmit(submitHandler)}
      className="pt-6 pb-8 mx-2 mb-4 bg-transparent "
    >
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <div className="mb-4">
        <FormRowInput
          className="w-full "
          id="email"
          type="email"
          inputType="email"
          title={"Username"}
          aria-label="email"
          prependComponent={<MdOutlineEmail fontSize={20} color="lightgrey" />}
          placeholder="Enter email"
          {...register("email", {
            required: "This is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid username",
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
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{7,})/,
              message:
                "Password must contain at least one uppercase letter, one number and one special character",
            },
          })}
          error={errors.password && errors.password.message}
          size="md"
        />
      </div>
      <div className="mb-4">
        <Link href={"/auth/forgot-password"}>
          <a className="text-left text-gray-400 text-sm">Forgot Password?</a>
        </Link>
      </div>
      {errors.password && (
        <ErrorMessage variant="danger">{errors.password.message}</ErrorMessage>
      )}
      <Button type="submit" color="dark" className="w-full">
        Sign In
      </Button>
    </form>
  );
}

export default LoginForm;
