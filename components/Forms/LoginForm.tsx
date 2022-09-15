import Link from "next/link";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";

function LoginForm({ submitHandler, handleSubmit, errors, register }) {
  return (
    <form
      aria-label="login-form"
      data-testid="login-form"
      onSubmit={handleSubmit(submitHandler)}
      className="px-2 pt-6 pb-8 mx-2 mb-4 bg-transparent "
    >
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 text-base font-bold ">
          Email Address:
        </label>
        <input
          className="z-0 w-full px-3 py-2 leading-tight text-gray-700 border rounded  appearance-none focus:outline-none "
          id="email"
          type="email"
          placeholder="Enter email"
          {...register("email", {
            required: "This is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address",
            },
          })}
        ></input>
      </div>
      {errors.email && (
        <ErrorMessage variant="danger">{errors.email.message}</ErrorMessage>
      )}
      <div className="mb-4">
        <label htmlFor="password" className="block mb-2 text-base font-bold ">
          Password:
        </label>
        <input
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded  appearance-none focus:outline-none "
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
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{7,})/,
              message:
                "Password must contain at least one uppercase letter, one number and one special character",
            },
          })}
        ></input>
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
