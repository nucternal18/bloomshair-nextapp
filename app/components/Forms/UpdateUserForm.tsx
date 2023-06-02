import { useCallback, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserInfoProps, IFormData } from "@lib/types";
import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "@app/features/users/userApiSlice";

const UpdateUserForm = ({
  refetch,
  user,
}: {
  refetch: () => void;
  user?: UserInfoProps;
}) => {
  const defaultValues = {
    name: user?.name ? user?.name : "",
    email: user?.email ? user?.email : "",
    address: user?.shippingAddress?.address
      ? user?.shippingAddress?.address
      : "",
    city: user?.shippingAddress?.city ? user?.shippingAddress?.city : "",
    postalCode: user?.shippingAddress?.postalCode
      ? user?.shippingAddress?.postalCode
      : "",
    country: user?.shippingAddress?.country
      ? user?.shippingAddress?.country
      : "",
    emailVerified: user?.isEmailVerified
      ? (user?.isEmailVerified as boolean)
      : false,
  };
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<IFormData>>({
    defaultValues: { ...defaultValues },
  });

  useEffect(() => {
    // reset the form when the user changes
    reset({ ...defaultValues });
  }, [user]);

  const submitHandler: SubmitHandler<Partial<IFormData>> = useCallback(
    async (data) => {
      const newData = {
        id: user?.id as string,
        name: data.name as string,
        email: data.email as string,
        shippingAddress: {
          address: data.address as string,
          city: data.city as string,
          postalCode: data.postalCode as string,
          country: data.country as string,
        },
      };
      try {
        const response = await updateUser(newData).unwrap();
        if (response.success)
          toast.success("Profile updated successfully.", {
            position: toast.POSITION.TOP_CENTER,
          });
        refetch();
      } catch (error) {
        toast.error("Something went wrong! Please try again", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    },
    []
  );

  return (
    <form
      aria-label="update-user-form"
      data-testid="update-user-form"
      onSubmit={handleSubmit(submitHandler)}
      className="grid grid-cols-1 gap-x-4 gap-y-6  bg-transparent md:grid-cols-2"
    >
      <div className="w-full space-y-2">
        <label className="my-2 text-sm font-semibold text-gray-900 dark:text-gray-200">
          Name
        </label>
        <input
          id="name"
          aria-label="partner-name"
          placeholder="Enter a full name"
          type="text"
          {...register("name", {
            required: true,
            minLength: {
              value: 2,
              message: "Please enter a name with at least 2 characters",
            },
            pattern: {
              value: /^[a-zA-Z0-9!@#$%^&*()._ -]+$/,
              message: "Please enter a valid name",
            },
          })}
          className="form-input block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.name && (
          <span className="text-center text-sm text-red-500">
            {errors.name.message || "A valid name is required"}
          </span>
        )}
      </div>
      <div className="w-full space-y-2">
        <label className="my-2 text-sm font-semibold text-gray-900 dark:text-gray-200">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          aria-label="Email"
          placeholder="Email"
          type="email"
          {...register("email", {
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
          })}
          className="form-input block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.email && (
          <span className="text-center text-sm text-red-500">
            {errors.email?.message || "Your email is required"}
          </span>
        )}
      </div>

      <div className="w-full space-y-2">
        <label className="my-2 text-sm font-semibold text-gray-900 dark:text-gray-200">
          Address
        </label>
        <input
          id="address"
          aria-label="address"
          placeholder="Enter the first line of your address"
          type="text"
          {...register("address", {
            pattern: {
              value: /^[a-zA-Z0-9!@#$%^&*()._ -]+$/,
              message: "Please enter a valid address",
            },
          })}
          className="form-input block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.address && (
          <span className="text-center text-sm text-red-500">
            {errors.address?.message || "Your address is required"}
          </span>
        )}
      </div>

      <div className="w-full space-y-2">
        <label className="my-2 text-sm font-semibold text-gray-900 dark:text-gray-200">
          City <span className="text-red-500">*</span>
        </label>
        <input
          id="city"
          aria-label="city"
          placeholder="Your City"
          type="text"
          {...register("city", {
            pattern: {
              value: /^[A-Za-z -]+$/,
              message: "Please enter a valid city",
            },
          })}
          className="form-input block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.city && (
          <span className="text-center text-sm text-red-500">
            {errors.city?.message || "Your city is required"}
          </span>
        )}
      </div>

      <div className="w-full space-y-2">
        <label className="my-2 text-sm font-semibold text-gray-900 dark:text-gray-200">
          Your PostCode <span className="text-red-500">*</span>
        </label>
        <input
          id="postCode"
          aria-label="post-code"
          placeholder="Your Post Code"
          type="text"
          {...register("postalCode", {
            pattern: {
              value: /^[A-Za-z]{1,2}[0-9]{1,2} ?[0-9][A-Za-z]{2}$/i,
              message: "Please enter a valid post code",
            },
          })}
          className="form-input block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.postalCode && (
          <span className="text-center text-sm text-red-500">
            {errors.postalCode?.message || "Your post code is required"}
          </span>
        )}
      </div>

      <div className="w-full space-y-2">
        <label className="my-2 text-sm font-semibold text-gray-900 dark:text-gray-200">
          Country <span className="text-red-500">*</span>
        </label>
        <input
          id="country"
          aria-label="country"
          placeholder="Enter your Country"
          type="text"
          {...register("country", {
            pattern: {
              value: /^[A-Za-z -]+$/,
              message: "Please enter a valid country",
            },
          })}
          className="form-input block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.country && (
          <span className="text-center text-sm text-red-500">
            {errors.country?.message || "Your country is required"}
          </span>
        )}
      </div>

      <div className="flex w-full items-center space-x-4 ">
        <input
          disabled
          type="checkbox"
          {...register("emailVerified")}
          className="form-checkbox h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-transparent"
        />
        <label className="my-2 text-sm font-semibold text-gray-900 dark:text-gray-200">
          Email Verified
        </label>
      </div>
      <div></div>
      <div>
        <Button
          type="submit"
          disabled={isLoadingUpdate}
          loading={isLoadingUpdate}
          variant="outline"
          className="rounded-md px-4 py-2 text-center font-semibold text-blue-700 border-blue-700 hover:text-white shadow-xl transition delay-150 
                duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-blue-700 md:text-lg"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default UpdateUserForm;
