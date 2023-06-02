import Button from "../Button";
import ErrorMessage from "../ErrorMessage";
import { IForm } from "@lib/types";

type FormInput = {
  email: string;
};

function RequestPasswordResetForm({
  submitHandler,
  errors,
  handleSubmit,
  register,
}: IForm<FormInput>) {
  return (
    <form
      aria-label="request-password-reset-form"
      data-testid="request-password-reset-form"
      onSubmit={handleSubmit(submitHandler)}
      className="px-2 pt-6 pb-8 mx-2 mb-4 bg-transparent "
    >
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block mb-2 text-base font-bold text-gray-700"
        >
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

      <Button type="submit" color="primary" className="w-full">
        Continue
      </Button>
    </form>
  );
}

export default RequestPasswordResetForm;
