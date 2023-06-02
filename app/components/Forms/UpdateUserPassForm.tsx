import { useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, PasswordInput } from "@mantine/core";
import { UserInfoProps } from "@lib/types";
import { toast } from "react-toastify";

import { useResetCredentialsMutation } from "@app/features/users/userApiSlice";

interface FormDataProps {
  password: string;
  confirmPassword: string;
  newPassword: string;
}

const UpdateUserPassForm = ({
  refetch,
  user,
}: {
  refetch: () => void;
  user: UserInfoProps;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataProps>();
  const [resetCredentials, { isLoading: isLoadingReset }] =
    useResetCredentialsMutation();

  const submitHandler: SubmitHandler<FormDataProps> = useCallback(
    async (data) => {
      if (data.newPassword !== data.confirmPassword) {
        toast.error("Passwords do not match. Please try again.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      try {
        const response = await resetCredentials({
          password: data.password,
          newPassword: data.newPassword,
        }).unwrap();
        if (response)
          toast.success("Password updated successfully.", {
            position: toast.POSITION.TOP_CENTER,
          });
        refetch();
        reset();
      } catch (error: any) {
        toast.error(
          error.message ?? "Something went wrong. Please try again.",
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      }
    },
    []
  );
  return (
    <form
      aria-label="profile-password-change-form"
      data-testid="profile-password-change-form"
      onSubmit={handleSubmit(submitHandler)}
      className="grid grid-cols-1 gap-x-4 gap-y-6  bg-transparent md:grid-cols-2"
    >
      <div className="mb-4">
        <PasswordInput
          id="current-password"
          aria-label="current-password"
          placeholder="Current Password"
          {...register("password", {
            required: true,
            minLength: {
              value: 10,
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
          variant="unstyled"
          className="w-full rounded-md border-2 border-gray-200 bg-white !focus:outline-none !focus:ring-transparent"
          error={errors.password && errors.password?.message}
        />
      </div>
      <div className="mb-4">
        <PasswordInput
          id="newPassword"
          aria-label="new-password"
          placeholder="New Password"
          {...register("newPassword", {
            required: true,
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
          variant="unstyled"
          className="w-full rounded-md border-2 border-gray-200 bg-white"
          error={errors.newPassword && errors.newPassword.message}
        />
      </div>
      <div>
        <PasswordInput
          id="confirmPassword"
          aria-label="confirm-password"
          placeholder="Confirm password"
          {...register("confirmPassword", {
            required: true,
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
          variant="unstyled"
          className="w-full rounded-md border-2 border-gray-200 bg-white"
          error={errors.confirmPassword && "Passwords do not match"}
        />
      </div>
      <div></div>
      <div>
        <h2 className="font-semibold">Password requirements:</h2>
        <p className="text-sm text-gray-400">
          Ensure that these requirements are met:
        </p>
        <ul className="ml-4 text-sm text-gray-400">
          <li>At least 10 characters and up to 100 characters</li>
          <li>At least one uppercase character</li>
          <li>At least one lowercase character</li>
          <li>Inclusion of at least on special character, e.g. ! @ # ?</li>
        </ul>
      </div>
      <div></div>
      <div>
        <Button
          type="submit"
          variant="outline"
          loading={isLoadingReset}
          className="rounded-md px-4 py-2 text-center font-semibold text-blue-700 border-blue-700 hover:text-white shadow-xl transition delay-150 
                duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-blue-700 md:text-lg"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default UpdateUserPassForm;
